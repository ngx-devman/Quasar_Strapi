const REGEX = /^\/?(.*)\.umd(?:\.min)?\.js$/

const getModuleName = (url) => {
  const pathname = new URL(url).pathname
  const match = pathname.match(REGEX)
  if (!match) throw new Error('Could not tect module name from URL.')
  return match[1]
}

const promises = {}

/**
 * Taking idea from
 * https://markus.oberlehner.net/blog/distributed-vue-applications-loading-components-via-http/
 * @param {*} url
 */

export default async function externalComponent (url, moduleName) {
  if (!url) throw new Error('url must be specified.')
  const name = moduleName || getModuleName(url)

  if (promises[name]) return promises[name]

  promises[name] = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.addEventListener('load', () => {
      resolve(window[name])
    })
    script.addEventListener('error', () => {
      reject(new Error(`Error loading ${url}`))
    })
    script.src = url
    document.head.appendChild(script)
  })

  return promises[name]
}
