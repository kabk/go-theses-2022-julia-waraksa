const { reactive } = window.Vue
const { markdownit, markdownitFootnote } = window

/**
 * Access to website content - chapters etc.
 */
export const Content = reactive({
  // Content chapters
  chapters: [
    { title: 'Introduction', file: '00-introduction.md', html: '' },
    { title: 'Formation of Memory', file: '01-formation-of-memory.md', html: '' },
    { title: 'Case Study - Babyn Yar', file: '02-babyn-yar.md', html: '' }
  ],

  // Chapter count
  get count() {
    return this.chapters.length
  },

  // First chapter
  get firstChapter () {
    return this.chapters[0]
  },

  // Last chapter
  get lastChapter () {
    return this.chapters[this.chapters.length - 1]
  },

  // Loads HTML-ized content of the specified chapter
  async loadChapter(index) {
    const chapter = this.chapters[index]
    const url = `content/${chapter.file}`
    const response = await fetch(url)
    const text = await response.text()
    const markdown = markdownit({
      html: true,
      linkify: true
    })
    markdown.use(markdownitFootnote)
    chapter.html = markdown.render(text)
    return chapter
  },

  // Loads the content of all chapters
  async initialize() {
    const all = []
    for (let i = 0; i < this.count; i++) {
      const chapter = await this.loadChapter(i)
      all.push(chapter)
    }
    return all
  }
})
