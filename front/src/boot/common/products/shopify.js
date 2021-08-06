const name = 'shopify'
import Client from 'shopify-buy'

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue } = dependencies
  return {
    init (config) {
      const debug = Vue.prototype.$debug.extend(`$products:${name}`)
      debug(`Initializing`, config)
      let client = null
      const { storefrontAccessToken, domain } = config
      client = Client.buildClient({ storefrontAccessToken, domain })
      debug(`Initialized`)
      return {
        // Returns details about a product...
        async details (product) {
          debug('Getting details for', product)
          const fullDetails = await client.product.fetch(product)
          if (fullDetails) {
            debug(`fullDetails(${product})`, product)
          } else {
            console.error(`Product ${product} doesn't exist in this storefront!`)
          }
          return fullDetails
        },
        // Returns a checkout object...
        async checkout (cart) {
          debug('Checking out!', cart)
          if (cart.length <= 0) {
            debug('Checkout called with no items in the cart', cart)
            return false
          }
          // Create a shopify checkout...
          const checkoutResponse = await client.checkout.create()
          debug('Checkout created:', checkoutResponse)
          // add items to shopify checkout
          // var lineItemsList = this.createLineItemsArray()
          const lineItemsToAdd = []
          debug(`Cart has ${cart.length} items...`)
          cart.forEach(item => {
            var lineItem = { variantId: item.id, quantity: item.quantity, customAttributes: [] }
            debug('Adding line item from', item, 'to', lineItem)
            lineItemsToAdd.push(lineItem)
          })
          const checkoutId = checkoutResponse.id
          debug('Checkout response and Lineitems list', { checkoutResponse, lineItemsToAdd })
          const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
          return checkout
        },
        // Finds something in the storefront...
        async search (query) {
          debug(`Searching for ${query}`)
          // Build the cache...
          /*
          client.product.fetchAll(250).then((providerProducts) => {
            console.log(providerProducts)
            const productx = []
            providerProducts.forEach(product => {
              const stock = []
              product.variants.forEach(variant => {
                if (variant.available) stock.push(variant.title)
              })
              productx.push({ id: product.id, title: product.title, stock })
            })
            console.log('PRODUCTX:', productx)
          })
          */
          const ret = client.product.fetchAll(250)
          return ret
        },
        // Returns details about the storefront itself...
        info () {
          const key = storefrontAccessToken
          const url = domain
          return { type: name, key, url, config, client }
        }
      }
    }
  }
}
