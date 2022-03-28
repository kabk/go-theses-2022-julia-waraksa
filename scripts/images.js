const { reactive } = window.Vue

/**
 * Service handling image popups
 */
export const Images = reactive({
  images: [
    {
      name: 'Figure 1',
      file: '00-image.jpg',
      text: ['Caption', '2009'],
    },
    {
      name: 'Figure 2',
      file: '01-cat.jpg',
      text: ['Caption', '2019'],
    },
  ],

  // Initializes the images
  // onProgress: callback used to notify about the progress of initialization
  async initialize(onProgress) {
    // find all <figure> element and link onclick event,
    // to show image popups
    const figures = document.querySelectorAll('figure')
    for (const figure of Array.from(figures)) {
      const name = figure.getAttribute('name')
      figure.addEventListener('click', () => {
        this.show(name)
      })
    }

    // Notify about the progress
    if (onProgress) {
      await onProgress(this)
    }
  },

  // Image count
  get count() {
    return this.images.length
  },

  // Currently displayed image
  image: null,

  // URL of the currently displayed image
  get imageUrl() {
    return this.getUrl(this.image)
  },

  // URL of the specified image
  getUrl(image) {
    if (image) {
      return `content/images/${image.file}`
    }
  },

  // Returns true if any image is currently visible
  get isVisible() {
    return this.image != null
  },

  // Hides the currently displayed image
  hide() {
    this.image = null
  },

  // Displays the image
  async show(name) {
    const image = this.images.find((image) => image.name == name)
    if (!image) throw new Error(`Image ${name} not defined in Images service`)
    this.image = image
  },
})
