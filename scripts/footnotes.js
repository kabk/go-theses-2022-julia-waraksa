const { reactive } = window.Vue
import { queryParent } from './utilities.js'

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
  get isVisible () {
    return this.footnote.id != null && this.footnote.isVisible
  },

  // Height of the current footnote
  get height () {
    return this.footerHelper.clientHeight
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
    this.footerElement = document.querySelector('footer')
    this.footerHelper = document.querySelector('#footer-helper')
    this.footnotes = []

    // Collect all footnotes within each chapter
    const chaptersElements = document.querySelectorAll('.chapter')
    for (const chapterElement of Array.from(chaptersElements)) {
      const chapter = parseInt(chapterElement.getAttribute('index'))
      const chapterFootnotes = chapterElement.querySelectorAll('.footnotes .footnote-item')

      // Re-number the footnotes, so they have unique identifiers within the chapter.
      // This allows us to start from 1. for each chapter
      for (let number = 1; number <= chapterFootnotes.length; number++) {
        const footnoteElement = chapterFootnotes[number - 1]
        const originalId = footnoteElement.getAttribute('id')
        const id = `fn-${chapter}-${number}`
        footnoteElement.setAttribute('id', id)
        const text = footnoteElement.innerHTML
        const footnote = { chapter, number, id, text, originalId }
        this.footnotes.push(footnote)
      }

      // Get footnote links
      const footnoteLinks = chapterElement.querySelectorAll('a[id]')
      for (const link of Array.from(footnoteLinks)) {
        const footnoteId = link.getAttribute('href').substring(1)
        const footnote = this.footnotes.find(f => f.chapter === chapter && f.originalId === footnoteId)

        // Change footnote link text to sequential number within the chapter.
        // When clicked, make it jump to the chapter footnotes section.
        link.innerHTML = footnote.number
        link.href = `#chapter-${chapter}-footnotes`
      }
    }

    console.log('Footnotes', this.footnotes)

    // Notify about the progress
    if (onProgress) {
      await onProgress(this)
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
    this.footnote.isVisible = false
    this.footerElement.style.height = '0px'
  },

  // Displays the specified footnote
  showFootnote (id) {
    // Render footnote text
    const text = this.getFootnote(id)
    this.footnote = { id, text, isVisible: text != null }
    // After a while, its height is known, so slide out the footnote container
    setTimeout(() => {
      this.footerElement.style.height = `${this.height}px`
    }, 100)
  },
})
