/**
 * This file only runs in development mode.
 */
export default ({ Vue }) => {
  if (process.env.SOURCE_DEV_MODE) {
    // This is a temp patch for development mode to wait for window.SourceDigital load
    // triggered by index.template.html
    return new Promise((resolve, reject) => {
      let count = 0
      const watcher = setInterval(() => {
        if (window.SourceDigital) {
          clearInterval(watcher)
          resolve()
        } else if (count > 20) {
          reject('Could not load window.SourceDigital')
        } else count++
      }, 100)
    })
  }
}
