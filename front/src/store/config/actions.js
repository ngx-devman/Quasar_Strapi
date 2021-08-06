import { throttle } from 'quasar'
import { hasLocalStorage } from '../../boot/storage'
import get from 'lodash/get'
import partition from 'lodash/partition'
/**
 * Takes a distribution id, gets the graphed details, and creates default configuration...
 * @example
 * // Hydrates with distribution Id 31...
 * this.$store.dispatch('config/hydrate', 31)
 * @param {*} context - This is the Vuex context and part of how Vuex works
 * @param {number} distribution - This is an integer representing the desired distribution to load
 */
export async function hydrate (context, distribution = 0) {
  const vm = this._vm
  let root = {}
  let user = {}
  const debug = vm.$debug.extend('config:actions:hydrate')
  distribution = window.SourceDigital.distribution.id
  debug(`Hydrating for distribution ${distribution}`)

  if (distribution) {
    // let data = await vm.$common.media.get(distribution)
    let data = JSON.parse(JSON.stringify(window.SourceDigital.config.data))

    debug('Hydration result', data)
    try {
      root = JSON.parse(JSON.stringify(window.SourceDigital.config))
      if (window.SourceDigital.user) user = JSON.parse(JSON.stringify(window.SourceDigital.user))
      debug('Merged root', root, user)

      // mixpanel identifying user
      vm.$mixpanel.identify(root.user.id)
      vm.$mixpanel.people.set({
        '$email': root.user.email,
        '$name': root.user.name,
        'Sign up date': root.user.created_at,
        'User ID': root.user.id
      })

      // ### Distribution content media detailed detection...
      const detected = vm.$common.media.detect(root.content.media)
      debug('media detected:', detected)
      // If the content type is not explicitly set, set it to the detected type...
      if (!root.content.type) root.content.type = detected.type
      root.content.source = detected.source

      debug('Getting events from distribution.data')
      // Validate all the things so we can rule out data bugs...
      // if it is live distribution, skip
      context.commit('setRawEvents', root.events)
      if (!get(root, 'data.distribution.forStreamingSetting')) root.events = vm.$common.validation.validate(root.events)
      // root.data = data
      root.session.distribution = parseInt(data.distribution.id)

      debug('Merge result', root, user)
      context.commit('mergeState', root)
      context.commit('mergeState', { user: Object.assign({ activity: {} }, user) })
      context.commit('loaded', true)
      if (!context.state.app.settings.pulse.enabled) console.warn('WARNING: Pulse (analytics) is disabled for this distribution! If this is not intended, make sure settings.pulse.enabled = true, contact support if you need help.')
    } catch (error) {
      const msg = 'Distribution doesn\'t exist or is mangled.'
      debug(msg, error)
      context.commit('error', msg)
      context.commit('loaded', true)
    }
    debug(`Initializing eCommerce...`)
    vm.$common.products.init()
  } else {
    debug('Distribution not loaded')
    context.commit('loaded', true)
  }

  // Tick counter...
  setInterval(() => { vm.$common.events.tick() }, context.state.timing.tick)
  // Pulse counter...
  setInterval(() => { vm.$pulse('heartBeat') }, context.state.timing.pulse)
  // Clear pulses...
  hasLocalStorage() && localStorage.removeItem('pulse')
  // Capture mouse positions...
  const pulse = vm.$pulse
  window.addEventListener('mousemove', throttle((e) => { pulse('focus', e) }, context.state.timing.throttle))
}

export async function setEvents (context, events = []) {
  const [toBePopulated, others] = partition(events, (i) => !!i.externalId && !i._populated)
  let populated = []
  if (toBePopulated && toBePopulated.length !== 0) {
    const { data } = await this._vm.$axios.post(`${this._vm.$config.server}activations/populate`, toBePopulated, { params: { sourceVersion: context.getters.sourceVersion } })
    populated = data
  }
  const rawEvents = [...populated, ...others]
  context.commit('setRawEvents', rawEvents)
  const validatedEvents = this._vm.$common.validation.validate(rawEvents)
  context.commit('setEvents', validatedEvents)
}

// Set relative cart quantity on an item. Payload must be { thing, qty }, where qty can be +1, -1, +5, -infinity, etc.
export function cartUpdateQty (context, payload) {
  const { thing, qty, storefront } = payload
  const vm = this._vm
  const pulse = vm.$pulse
  const cart = context.state.app.user.cart
  const debug = vm.$debug.extend('config:actions:cartAdd')

  // Get the title for for cart items as well as things...
  const title = thing.dataObject ? thing.dataObject.data.name : thing.title
  debug(`Modifying ${title} in the cart (${qty})`, cart)

  if (thing) {
    let stockNeeded = 0
    let alreadyInCart = false
    // Update quantity instead of adding an item if the item is already in the cart...
    cart.forEach(product => {
      if (product.id === thing.id) {
        debug('Already in cart')
        alreadyInCart = true
        stockNeeded = product.quantity + qty
      }
    })

    // If stockNeeded < 1, we're actually removing the item
    if (stockNeeded < 1) stockNeeded = 0
    context.commit('setStorefront', { thing, storefront })

    let adjustCart = function () {
      if (alreadyInCart) {
        context.commit('cartUpdateQty', { thing, qty })
        pulse('cartUpdateQty', { thing, qty: stockNeeded })
      } else {
        context.commit('cartAdd', thing)
        pulse('cartAdd', thing)
      }
    }

    /*
    // Make sure the item is in stock unless it's a direct item, or we're deleting it (needed = 0)...
    if (thing.dataObject && !thing.dataObject.data.direct_checkout_enable && stockNeeded !== 0) {
      var self = this
      vm.$common.timeline
        .callStock(thing.dataObject.data.externalProductId, thing.dataObject.data.externalCatalog)
        .then(function (response) {
          // TODO: The stock check doesn't work for direct products...
          debug(`There are ${response} items in stock for item ${thing.id}`)
          if (stockNeeded > response) {
            self.$q.notify({ color: 'red-4', textColor: 'white', icon: 'cloud_done', message: `${thing.dataObject.data.name} has been sold out, please update quantity` })
          } else {
            adjustCart()
          }
        })
    } else {
      adjustCart()
    }
    */
    adjustCart()
  }
}

// Clears the users cart...
export function cartClear (context) {
  const vm = this._vm
  const pulse = vm.$pulse
  const cart = context.state.app.user.cart
  const debug = vm.$debug.extend('config:actions:cartClear')
  debug(`Clearing the cart`, cart)
  context.commit('cartClear')
  pulse('cartClear')
}

// Gets data from an admin call...
export async function loadAdmin (context, payload) {
  const id = context.state.app.session.distribution
  try {
    var result = await this._vm.$axios.get(`${context.state.server}administrator/${payload}/${id}`)
    context.commit('loadAdmin', { name: payload, payload: result.data.data })
  } catch (error) {
    console.error(error)
  }
}

// Called automatically (in experienceLoader.vue via q-resize-observer) whenever the layout changes (through screen size changes, rehydration, reskinning or otherwise)...
export function layoutChange (context, payload) {
  const vm = this._vm
  const pulse = vm.$pulse
  const debug = vm.$debug.extend('config:actions:layoutChange')

  // Give the sandbox some additional detail to work with...
  payload.platform = JSON.parse(JSON.stringify(vm.$q.platform))
  payload.screen = JSON.parse(JSON.stringify(vm.$q.screen))
  let forced = payload.forcedOrientation || context.state.app.layout.forcedOrientation
  payload.orientation = forced || (vm.$q.screen.width > vm.$q.screen.height ? 'landscape' : 'portrait')
  if (payload.underlay) payload.underlay.visible = payload.underlay.height > 0 && payload.underlay.width > 0
  // console.warn('xx', payload)
  vm.$event.emit('layoutChange')
  const lastOrientation = vm.$app.layout ? vm.$app.layout.orientation ? vm.$app.layout.orientation : '' : ''
  // If on mobile, and the new orientation is different than the last, fire a mobileOrientation event...
  if (vm.$q.platform.is.mobile && lastOrientation !== payload.orientation) {
    payload.mobileOrientation = payload.orientation
    vm.$event.emit('mobileOrientation', payload.orientation)
  }

  // Handle underlay visibility...
  context.commit('mergeState', { layout: payload })
  debug(`Changing layout:`, payload)
  pulse('layoutChange', payload)
}

export function logout ({ commit }) {
  commit('logout')
}

export function updateUserProfile ({ commit }, payload) {
  commit('mergeState', { user: payload })
}

export function setExperienceToken ({ commit }, token) {
  commit('setExperienceTokenSync', token)
}

export function setUTMParams ({ commit }, params) {
  commit('setUTMParams', params)
}
