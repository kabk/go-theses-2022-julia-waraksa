const { reactive } = window.Vue

/**
 * Handles all things related to displaying footnotes
 */
export const Footnotes = reactive({
  // All footnotes
  footnotes: [],

  // Currently displayed footnote
  footnote: { id: null, text: null, isVisible: false, height: 0 },

  // Returns true if there is a footnote visible
  get isVisible () {
    return this.footnote.id != null && this.footnote.isVisible
  },

  // Returns true if the specified chapter has any footnotes
  chapterHasFootnotes (chapter) {
    return this.footnotes.some(footnote => footnote.chapter === chapter)
  },

  // Returns all footnotes belonging to the specified chapter
  getChapterFootnotes (chapter) {
    return this.footnotes.filter(footnote => footnote.chapter === chapter)
  },

  // Initializes the footnotes, by capturing footnote links
  // and replacing them with onclick event, which will display
  // the footnotes the way and place we want them to be
  // onProgress: callback used to notify about the progress of initialization
  async initialize (onProgress) {
    this.footnotes = []

    // Collect all footnotes within each chapter
    const chaptersElements = document.querySelectorAll('.chapter')
    let number = 1
    for (const chapterElement of Array.from(chaptersElements)) {
      const chapter = parseInt(chapterElement.getAttribute('index'))
      const chapterFootnotes = chapterElement.querySelectorAll('.footnotes .footnote-item')

      // Re-number the footnotes, so they have unique identifiers within the chapter.
      // This allows us to start from 1. for each chapter
      for (const footnoteElement of Array.from(chapterFootnotes)) {
        const originalId = footnoteElement.getAttribute('id')
        const id = `fn-${chapter}-${number}`
        footnoteElement.setAttribute('id', id)
        const text = footnoteElement.innerHTML
        const footnote = { chapter, number, id, text, originalId }
        this.footnotes.push(footnote)
        number++
      }

      // Get footnote links
      const footnoteLinks = chapterElement.querySelectorAll('a[id]')
      for (const link of Array.from(footnoteLinks)) {
        const footnoteId = link.getAttribute('href').substring(1)
        const footnote = this.footnotes.find(f => f.chapter === chapter && f.originalId === footnoteId)

        // Change footnote link text to sequential number within the chapter.
        // When clicked, make it jump to the chapter footnotes section.
        link.id = `fnref${footnote.number}`
        link.innerHTML = footnote.number
        link.href = `#chapter-${chapter}-footnotes`
      }

    }

    // Notify about the progress
    if (onProgress) {
      await onProgress(this)
    }
  },

  // Navigates back to footnote link from clicked footnote
  backToLink (footnote) {
    window.location = `#fnref${footnote.number}`
  }
})