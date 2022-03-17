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
