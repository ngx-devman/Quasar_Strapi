/**
 * All product processors for the UI
 */

import shopify from './shopify'
import fastspring from './fastSpring'
import { util } from 'experience-engine'

// The providers init code...
const Providers = {
  shopify,
  fastspring
}
const storefront = {}
const provider = {}

function storefrontExists (name, product) {
  if (!storefront[name]) {
    console.error('Called a storefront that does not exist in this distribution. Please add this storefront or remove this activation!', name, product)
    return false
  }
  return true
}

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue, store } = dependencies
  const $app = Vue.prototype.$app
  const debug = Vue.prototype.$debug.extend(`$products`)
  return {
    async init () {
      debug(`init() with these settings:`, $app.settings.ecommerce)
      // Invoke each storefront if they exist...
      if ($app.settings.ecommerce && $app.settings.ecommerce.storefronts) {
        Object.keys($app.settings.ecommerce.storefronts).forEach(name => {
          const config = $app.settings.ecommerce.storefronts[name]
          // If not yet invoked...
          if (!provider[config.provider]) {
            debug(`Loading ${config.provider} client`)
            provider[config.provider] = Providers[config.provider](dependencies)
          }
          debug(`Invoking ${name} storefront:`, config)
          storefront[name] = provider[config.provider].init(config.settings)
        })
        debug('Initialization complete. The following storefronts are loaded:', storefront)
        // Now check the activations and make sure all storefronts exist...
        let index = 0
        $app.events.forEach(event => {
          const name = util.get(event, 'dataObject.data.externalCatalogId')
          if (name && !storefront[name]) {
            store.commit('config/error', `Storefront "${name}" is referenced inside activation ${index} but it is not linked to this distribution`)
          }
          index++
        })
      } else {
        debug('Did not initialize: No storefronts specified.')
      }
    },
    // Finds the current product processor, encodes the cart, sends it out to be processed by our API and returns the result...
    async checkout (cart, name) {
      if (storefrontExists(name, cart)) {
        debug(`checkout(${name}) ->`, cart)
        const preFlight = await storefront[name].checkout(cart)
        return preFlight
      }
    },
    // Finds details about a product...
    async details (product) {
      const productId = product.dataObject.data.externalProductId
      const storefrontId = product.dataObject.data.externalCatalogId
      if (storefrontExists(storefrontId, product)) {
        debug(`details(${storefrontId}, ${productId})`)
        const details = await storefront[storefrontId].details(productId)
        return details
      }
    },
    // Searches a storefront for products, or returns all products...
    async search (storefrontId, query) {
      if (storefrontExists(storefrontId, query)) {
        const results = await storefront[storefrontId].search(query)
        return results
      }
    },
    // Returns details about the storefront...
    info (storefrontId) {
      if (storefrontExists(storefrontId, {})) {
        const result = storefront[storefrontId].info()
        return result
      }
    },
    storefronts: storefront
  }
}
