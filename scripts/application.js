import { Content } from './content.js'
import { Navigator } from './navigator.js'
import { Footnotes } from './footnotes.js'
import { Tooltips } from './tooltips.js'
import { Images } from './images.js'
import { Gallery } from './gallery.js'
import { Links } from './links.js'
import { delay } from "./utilities.js"

export const Application = {
  data () {
    return {
      // Indicates whether the application is still loading
      isLoading: true,
      // Set this to true to display loading overlay
      showLoadingProgress: false,
      // Slight delay between loading stages, otherwise it all just blinks too fast
      loadingDelay: 100,
      // Application services
      Content,
      Navigator,
      Footnotes,
      Tooltips,
      Images,
      Gallery,
      Links
    }
  },

  methods: {
    // Initializes the application and services
    async initialize () {
      this.isLoading = true

      await this.Content.initialize(this.progress)
      await this.Navigator.initialize(this.progress)
      await this.Footnotes.initialize(this.progress)
      await this.Images.initialize(this.progress)
      await this.Gallery.initialize(this.progress)
      await this.Tooltips.initialize(this.progress)
      await this.Links.initialize(this.progress)

      this.isLoading = false
    },

    // Reports initialization progress
    async progress () {
      if (this.showLoadingProgress) {
        await delay(this.loadingDelay)
      }
    }
  },

  async created () {
    await this.initialize()
  }
}