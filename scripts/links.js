const { reactive } = window.Vue

/**
 * All logic related to managing links in the content
 */
export const Links = reactive({
  // Initializes the links
  // onProgress: callback used to notify about the progress of initialization
  async initialize (onProgress) {

    const links = document.querySelectorAll('a')
    for (const link of Array.from(links)) {
      // All external links should open in a new tab
      const url = link.getAttribute('href') || ''
      if (!url.startsWith('#')) {
        link.setAttribute('target', '_blank')
      }
    }
  }
})