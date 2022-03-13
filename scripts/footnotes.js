const { reactive } = window.Vue

/**
 * Handles all things related to displaying footnotes
 */
export const Footnotes = reactive({
  // Currently displayed footnote
  visibleFootnote: { id: null, text: null},

  // Returns true if there is a footnote visible
  get isFootnoteVisible () {
    return this.visibleFootnote.id != null
  },

  // Initializes the footnotes, by capturing footnote links
  // and replacing them with onclick event, which will display
  // the footnotes the way and place we want them to be
  initialize () {
    const footnoteLinks = document.querySelectorAll('a[id]')
    for (const link of Array.from(footnoteLinks)) {
      const footnoteId = link.getAttribute('href').substring(1)
      link.setAttribute('href', '#')
      link.addEventListener('click', () => this.showFootnote(footnoteId))
    }
  },

  // Retrieves the text of the specified footnote
  getFootnote (id) {
    const element = document.querySelector(`li[id=${id}]`)
    if (element) {
      return element.innerHTML
    }
  },

  // Hides the displayed footnote
  hideFootnote () {
    this.visibleFootnote.id = null
    this.visibleFootnote.text = null
  },

  // Displays the specified footnote
  showFootnote (id) {
    this.hideFootnote()
    const text = this.getFootnote(id)
    if (text) {
      this.visibleFootnote.id = id
      this.visibleFootnote.text = text
    }
  }
})