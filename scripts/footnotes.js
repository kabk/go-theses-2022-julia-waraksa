const { reactive } = window.Vue

/**
 * Handles all things related to displaying footnotes
 */
export const Footnotes = reactive({
  // UI elements where footnotes are shown
  footerElement: null,
  footerHelper: null,

  // All footnotes
  footnotes: [],

  // Currently displayed footnote
  footnote: { id: null, text: null, isVisible: false, height: 0 },

  // Returns true if there is a footnote visible
  get isVisible() {
    return this.footnote.id != null && this.footnote.isVisible
  },

  // Height of the current footnote
  get height() {
    return this.footerHelper.clientHeight
  },

  // Initializes the footnotes, by capturing footnote links
  // and replacing them with onclick event, which will display
  // the footnotes the way and place we want them to be
  // onProgress: callback used to notify about the progress of initialization
  async initialize(onProgress) {
    this.footerElement = document.querySelector('footer')
    this.footerHelper = document.querySelector('#footer-helper')
    this.footnotes = []

    const footnoteElements = document.querySelectorAll('.footnotes .footnote-item')
    for (const footnoteElement of Array.from(footnoteElements)) {
      const id = footnoteElement.getAttribute('id')
      const number = id.substring(2)
      const text = footnoteElement.innerHTML
      const footnote = { id, number, text }
      this.footnotes.push(footnote)
    }

    const footnoteLinks = document.querySelectorAll('a[id]')
    for (const link of Array.from(footnoteLinks)) {
      const footnoteId = link.getAttribute('href').substring(1)
      link.setAttribute('href', '#')
      link.addEventListener('click', () => this.showFootnote(footnoteId))
    }

    // Notify about the progress
    if (onProgress) {
      await onProgress(this)
    }
  },

  // Retrieves the text of the specified footnote
  getFootnote(id) {
    const element = document.querySelector(`li[id=${id}]`)
    if (element) {
      return element.innerHTML
    }
  },

  // Hides the displayed footnote
  hideFootnote() {
    this.footnote.isVisible = false
    this.footerElement.style.height = '0px'
  },

  // Displays the specified footnote
  showFootnote(id) {
    // Render footnote text
    const text = this.getFootnote(id)
    this.footnote = { id, text, isVisible: text != null }
    // After a while, its height is known, so slide out the footnote container
    setTimeout(() => {
      this.footerElement.style.height = `${this.height}px`
    }, 100)
  },
})
