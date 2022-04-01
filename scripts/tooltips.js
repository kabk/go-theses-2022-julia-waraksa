const { reactive } = window.Vue

/**
 * Handles all things related to displaying tooltips
 */
export const Tooltips = reactive({
  // UI elements where tooltip is shown
  tooltipElement: null,

  // Currently displayed tooltip
  tooltip: null,

  // Returns true if there is a tooltip visible
  get isVisible () {
    return this.tooltip != null
  },

  // Returns CSS style for the tooltip element,
  // controlling its visibility
  get tooltipStyle () {
    if (this.isVisible) {
      return {
        'opacity' : 1
      }
    } else {
      return {
        'opacity': 0
      }
    }
  },

  // Initializes the tooltips, by finding elements with 'title' attribute
  // and capturing their mouse events
  // onProgress: callback used to notify about the progress of initialization
  async initialize (onProgress) {
    this.tooltipElement = document.querySelector('.tooltip')

    // Find all elements with tooltips
    const elementsWithTooltip = document.querySelectorAll('*[title]')
    for (const element of Array.from(elementsWithTooltip)) {
      // Skip figures and other elements also using 'title'
      if (element.getAttribute('href') == '#figure') continue
      // Get tooltip text and remove 'title' attribute
      // so that default tooltip isn't shown by the browser
      const tooltip = element.getAttribute('title')
      element.removeAttribute('title')

      // Link mouse events
      element.addEventListener('mouseover', (event) => {
        this.tooltip = null
        const { clientX, clientY } = event
        this.tooltipElement.style.left = `${clientX + 12}px`
        this.tooltipElement.style.top = `${clientY + 12}px`
        this.tooltip = tooltip
      })

      element.addEventListener('mouseout', () => {
        this.tooltip = null
      })
    }

    // Notify about the progress
    if (onProgress) {
      await onProgress(this)
    }
  }
})
