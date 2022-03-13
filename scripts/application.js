import { Content } from './content.js'
import { Navigator } from './navigator.js'
import { Footnotes } from './footnotes.js'

export const Application = {
  data () {
    return {
      Content,
      Navigator,
      Footnotes
    }
  },

  methods: {
    async initialize () {
      await this.Content.initialize()
      await this.Navigator.initialize()
      await this.Footnotes.initialize()
    }
  },

  async created () {
    await this.initialize()
  }
}