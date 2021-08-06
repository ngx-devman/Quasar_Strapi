import { extend } from 'quasar'
import { util } from 'experience-engine'

const getParams = (params) => {
  const utm = { ...params }
  for (let key in utm) { if (!utm[key]) delete utm[key] }
  return utm
}

// Merges the existing state with the incomming payload...
export function mergeState (state, payload) {
  this._vm.$set(state, 'app', extend(true, state.app, payload))
}

export function setRawEvents (state, payload) {
  state.app.rawEvents = payload
}

export function setEvents (state, payload) {
  state.app.events = payload
}

// Merges in a certain part of the admin data...
export function loadAdmin (state, payload) {
  this._vm.$set(state.admin, payload.name, payload.payload)
}

export function error (state, payload) {
  state.error = true
  state.errorMessage = payload
}

export function setTime (state, payload) {
  state.app.content.currentTime = payload
}

// Causes a tick to pass (100ms is the default tick)...
export function tick (state, payload) {
  state.app.session.time += state.timing.tick / 1000
  state.app.session.time = parseFloat(state.app.session.time.toFixed(3))
  if (this._vm.$common.media.ref) {
    if (this._vm.$common.media.ref.currentTime) state.app.content.currentTime = parseFloat(this._vm.$common.media.ref.currentTime.toFixed(3))
    state.app.content.playing = this._vm.$common.media.ref.playing
    state.app.content.loading = this._vm.$common.media.ref.loading
    state.app.content.seeking = this._vm.$common.media.ref.seeking
    if (this._vm.$common.media.ref.buffered) state.app.content.buffered = parseFloat(this._vm.$common.media.ref.buffered.toFixed(3))
    state.app.content.duration = this._vm.$common.media.ref.duration
    state.app.content.volume = this._vm.$common.media.ref.volume
    state.app.content.speed = this._vm.$common.media.ref.speed
    state.app.content.ratio = this._vm.$common.media.ref.ratio
    state.app.content.language = this._vm.$common.media.ref.language
  }
  // Determine the user activity level...
  let timeSinceLastActivity = state.app.session.time - state.app.user.activity.lastTime
  state.app.user.activity.level = (timeSinceLastActivity >= 4) ? 'inactive' : 'active'
  // Determine what events are currently visible...
  state.app.session.visibleEvents = []
  state.app.session.invisibleEvents = []
  const currentTimeMs = state.app.content.currentTime * 1000
  // TODO: May need to change this to a Vue array call as it might not be responsive otherwise...
  if (state.app && state.app.events) {
    // Check if events are an array, or an object...
    if (state.app.events.constructor !== Array) {
      state.error = true
      state.errorMessage = 'The events in this distribution are invalid.'
      return
    }
    const visibleEvents = []
    state.app.events.forEach(event => {
      // If the event's time is now...
      if (event.startTimeMs < currentTimeMs && event.endTimeMs > currentTimeMs) {
        // If it's invisible put it in the invisible list...
        if (event.dataTypeName === 'hidden') {
          state.app.session.invisibleEvents.push(event)
          // If it's visible put it in the visible list...
        } else {
          visibleEvents.push(event)
        }
      }
    })
    // Sort visible items by newest first...
    state.app.session.visibleEvents = util.orderBy(visibleEvents, 'startTimeMs', 'desc')
  }
}

// Updates what the user is looking at...
export function viewThing (state, payload) {
  let itemId = _setThing.call(this, state, payload)
  // Add routing for activations
  if (!window.SourceDigital.experience.embedded && state.app.user.activity.lookingAt.thing) {
    if (itemId) {
      this.$router.push({ path: `/${this.$router.currentRoute.params.experience}/${itemId}`, query: getParams(state.app.utmParams) })
    }
  }
}

export function _setThing (state, payload) {
  this._vm.$set(state.app.user.activity.lookingAt, 'thing', payload)
  if (!payload) return false
  const itemId = payload.id ? payload.id : payload.dataObject.data.externalProductId ? payload.dataObject.data.externalProductId : null
  this._vm.$analytics(this._vm.$common.constants.events.interact)
  this._vm.$pulse('activationTouch', { id: itemId })
  return itemId
}

// Updates when the user is looking at something, but without rerouting them | viewThing simplified
export function setThing (state, payload) {
  _setThing.call(this, state, payload)
}

// Cancels what the user is looking at...
export function stopViewingThing (state, payload) {
  if (!window.SourceDigital.experience.embedded) {
    this.$router.push({ path: `/${this.$router.currentRoute.params.experience}`, query: getParams(state.app.utmParams) })
  }
  state.app.user.activity.lookingAt.thing = false
}

// When a user views an iframe...
export function viewIframe (state, payload) {
  this._vm.$set(state.app.user.activity.lookingAt, 'iframe', payload)
}

// Cancels what iframe the user is looking at...
export function stopViewingIframe (state, payload) {
  state.app.user.activity.lookingAt.iframe = false
}

// Updates the trigger list...
export function triggers (state, payload) {
  if (payload.length && payload.length > 0) {
    state.app.session.triggers = payload
  }
}

// Updates something for the user...
export function updateUser (state, payload) {
  if (payload.path) {
    if (payload.path === 'lookingAt') {
      state.app.user.activity.lookingAt.x = payload.data.x
      state.app.user.activity.lookingAt.y = payload.data.y
    }
  }
  if (payload.event !== 'heartBeat') {
    state.app.user.activity.lastTime = state.app.session.time // Update when the user last did something
    state.app.user.activity.current = payload.event
  }
  // state.app.user.lastAction = payload.event
}

// Adds an item to the users cart...
export function cartAdd (state, thing) {
  if (thing) {
    this._vm.$set(thing, 'quantity', 1)
    state.app.user.cart.push(thing)
  }
}

export function cartUpdateQty (state, payload) {
  let { thing, qty } = payload
  if (thing) {
    let found = false
    let index = 0
    // See if the product is already in the cart...
    state.app.user.cart.forEach(product => {
      if (product.id === thing.id) found = index
      index++
    })
    if (found !== false) {
      state.app.user.cart[found].quantity += qty
      // If the resulting quantity < 1, delete it...
      if (state.app.user.cart[found].quantity <= 0) state.app.user.cart.splice(found, 1)
    }
  }
}

export function setStorefront (state, payload) {
  let { storefront, thing } = payload
  this._vm.$set(thing, 'storefront', storefront)
}

// Clears the users cart...
export function cartClear (state, payload) {
  state.app.user.cart = []
}

// Decides if the configuration has been loaded yet or not (for changing app load state in templates, etc)...
export function loaded (state, payload) {
  if (payload !== true && payload !== false) throw new Error('config.loaded mutation must be true or false, recieved ' + payload)
  state.loaded = payload

  // re-identify all triggers...
  if (state.app.triggers) {
    let accumulator = 1
    Object.keys(state.app.triggers).forEach(branch => {
      state.app.triggers[branch].forEach(trigger => {
        trigger.id = accumulator++
      })
    })
  }
}

// Changes the state to reflect a layout change...
export function layoutChange (state, payload) {
  if (payload.underlay) {
    state.app.layout.underlay.visible = payload.underlay.height > 0
    state.app.layout.underlay.height = payload.underlay.height
    state.app.layout.underlay.width = payload.underlay.width
  }
}

export function logout (state) {
  state.app.user.id = 1
}

export function addUserContentItem (state, payload) {
  state.app.user.content.filter(el => el.type === payload.type)[0].items.push(payload.model)
}

export function setUserContent (state, payload) {
  state.app.user.content = payload
}

export function setExperienceTokenSync (state, payload) {
  state.app.session.experienceToken = payload
}

export function setUTMParams (state, payload) {
  state.app.utmParams = payload
}
