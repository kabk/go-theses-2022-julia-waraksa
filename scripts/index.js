const { createApp } = window.Vue
import { Application } from './application.js'

window.addEventListener('load', () => {
  const app = createApp(Application)
  app.mount('#app')
}) 