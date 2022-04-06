const { reactive } = window.Vue

/**
 * Implementation of a photo gallery viewer
 */
export const Gallery = reactive({
  // Galleries of images
  galleries: {},

  // Initializes the galleries, by finding all .gallery containers
  // and wiring up UI and event handlers.
  // onProgress: callback used to notify about the progress of initialization
  async initialize (onProgress) {
    const galleryContainers = document.querySelectorAll('.gallery')

    for (const element of Array.from(galleryContainers)) {

      // Extract all images in the gallery container, store in 'galleries' list
      const id = element.getAttribute('id')
      const images = Array
        .from(element.querySelectorAll('img'))
        .map(image => ({
          src: image.getAttribute('src'),
          label: image.getAttribute('label'),
          class: image.getAttribute('class'),
        }))

      this.galleries[id] = { id, images, element, index: 0 }

      // Remove the images
      element.innerHTML = ''

      // Add image container, where background image will be set
      // to display the changing image
      const imageContainer = document.createElement('main')
      element.appendChild(imageContainer)

      // Add left & right clickable areas
      const leftColumn = document.createElement('div')
      leftColumn.classList.add('left')
      imageContainer.appendChild(leftColumn)

      const rightColumn = document.createElement('div')
      rightColumn.classList.add('right')
      imageContainer.appendChild(rightColumn)

      // Add footer element
      const footer = document.createElement('footer')
      element.appendChild(footer)

      // Reveal the gallery
      element.style.visibility = 'visible'

      // Wire up click events to go back and forward in the gallery
      leftColumn.addEventListener('click', () => this.back(id))
      rightColumn.addEventListener('click', () => this.forward(id))

      // Show the first two images
      this.back(id, true)
    }
  },

  // Shows the specified image in the gallery
  show (galleryId, index) {
    const gallery = this.galleries[galleryId]
    if (gallery && index >= 0 && index < gallery.images.length) {
      const imageElement = gallery.element.querySelector('main')
      const footerElement = gallery.element.querySelector('footer')

      imageElement.classList.remove('reveal')
      imageElement.classList.add('hide')

      setTimeout(() => {
        const image = gallery.images[index]
        footerElement.innerHTML = image.label
        footerElement.style.visibility = image.label ? 'visible' : 'hidden'
        imageElement.style.backgroundImage = `url('${image.src}')`
        imageElement.classList.remove('hide')
        imageElement.classList.add('reveal')
      }, 100)
    }
  },

  // Reloads the current images in the gallery
  refresh (galleryId) {
    const gallery = this.galleries[galleryId]
    if (gallery) {
      this.show(galleryId, gallery.index)
    }
  },

  // Goes back in the specified gallery
  back (galleryId, forceRefresh) {
    const gallery = this.galleries[galleryId]
    if (gallery && (gallery.index > 0 || forceRefresh)) {
      gallery.index = Math.max(0, gallery.index - 1)
      this.refresh(galleryId)
    }
  },

  // Goes forward in the specified gallery
  forward (galleryId, forceRefresh) {
    const gallery = this.galleries[galleryId]
    if (gallery && (gallery.index < gallery.images.length - 1 || forceRefresh)) {
      gallery.index = Math.min(gallery.images.length - 1, gallery.index + 1)
      this.refresh(galleryId)
    }
  }
})

