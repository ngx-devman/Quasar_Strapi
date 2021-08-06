const name = 'fastSpring'

function formData (obj) {
  return Object.keys(obj).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(JSON.stringify(obj[k]))).join('&')
}
export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue } = dependencies
  return {
    init (config) {
      const debug = Vue.prototype.$debug.extend(`$products:${name}`)
      debug(`Initializing`, config)
      const { client, store } = config
      const webUrl = `https://${client}.onfastspring.com/${store}/builder`
      debug(`Initialized`)
      return {
        // Returns details about a product...
        async details (product) {
          debug(`WARNING: ${name} Does NOT support product details!`, product)
          const err = `ERROR: Not supported in ${name}`
          return { title: err, name: err }
        },
        // Returns a checkout object...
        async checkout (cart) {
          debug('Checking out!', cart)
          if (cart.length <= 0) {
            debug('Checkout called with no items in the cart', cart)
            return false
          }
          // Create a shopify checkout...
          const items = []
          debug(`Cart has ${cart.length} items...`)
          cart.forEach(item => {
            var lineItem = { path: item.dataObject.data.externalProductId, quantity: item.quantity }
            debug('Adding line item from', item, 'to', lineItem)
            items.push(lineItem)
          })
          let post = {
            put: { items, sblVersion: '0.7.6' }
          }
          debug('Checkout response', post)
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/javascript, */*; q=0.01'
          }
          // Push the shopping cart to get a session...
          let result = await Vue.prototype.$axios({ method: 'POST', url: webUrl, data: formData(post), headers })
          debug('response 1', result)
          const session = result.data.serial
          post = {
            put: { sblVersion: '0.7.6' },
            session
          }
          // Send the session and finalize the order...
          result = await Vue.prototype.$axios({ method: 'POST', url: webUrl + '/finalize', data: formData(post), headers })
          debug('response 2', result)

          return { webUrl: result.data.url }
        },
        // Finds something in the storefront...
        async search (query) {

        },
        // Returns details about the storefront itself...
        info () {
          const key = 'N/A'
          const url = webUrl
          return { type: name, key, url, config, client: {} }
        }
      }
    }
  }
}
