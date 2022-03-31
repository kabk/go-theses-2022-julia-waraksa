/**
 * Waits the specified interval and returns
 * @param {Number} interval Interval to wait, in milliseconds
 */
export function delay(interval) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, interval)
  })
}

/**
 * Finds parent element matching the specified selector
 */
export function queryParent (element, selector, stopSelector) {
  let parentElement = null

  while (element) {
    if (element.matches(selector)) {
      parentElement = element
      break
    } else if (stopSelector && element.matches(stopSelector)) {
      break
    }
    element = element.parentElement
  }

  return parentElement
}
