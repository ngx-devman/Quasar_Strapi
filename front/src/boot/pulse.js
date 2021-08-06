import jsonata from 'jsonata'
import Timeline from './common/timeline'
import { hasLocalStorage } from './storage'
// DO NOT CHANGE PULSE IDs! Only add new ones! If you change a pulse ID you will destroy the ability to detect previous pulses!
const pulse = {
  'heartBeat': { id: 0, process: (e) => ({}) },
  'touch': { id: 13, update: 'lookingAt', process: (e) => ({ x: e.x, y: e.y }) },
  'focus': { id: 14, update: 'lookingAt', process: (e) => ({ x: e.x, y: e.y }) },
  'focusOnExperience': { id: 15, ignore: true, process: (e) => ({ x: e.x, y: e.y }) },
  'focusOffExperience': { id: 16, ignore: true, process: (e) => ({ x: e.x, y: e.y }) },
  'focusOnMedia': { id: 17, ignore: true, process: (e) => ({ x: e.x, y: e.y }) },
  'focusOffMedia': { id: 18, ignore: true, process: (e) => ({ x: e.x, y: e.y }) },
  'cartAdd': { id: 19, process: (e) => ({ p: e.id }) },
  'cartUpdateQty': { id: 20, process: (e) => ({ p: e.thing.id, q: e.qty }) },
  'cartClear': { id: 21, process: (e) => ({}) },
  'start': { id: 22, process: (e) => ({}) },
  'end': { id: 23, process: (e) => ({}) },
  'invisible': { id: 24, process: (e) => ({ n: e.title }) },
  'visited': { id: 25, process: (e) => ({ u: e.url }) },
  'custom': { id: 26, process: (e) => ({ n: e.name, p: e.payload }) },
  'activationImpression': { id: 27, process: (e) => ({ d: e.meta.display }) },
  'activationEngagement': { id: 28, process: (e) => ({ d: e.meta.display }) },
  'activationConversion': { id: 29, process: (e) => ({ d: e.meta.display }) },
  'activationDisplay': { id: 30, process: (e) => ({ p: e }) },
  'activationTouch': { id: 31, process: (e) => ({ p: e }) },
  'activationAction': { id: 32, process: (e) => ({ p: e }) }
}
// eslint-disable-next-line
let internalIP = 0

// This just takes the above "process" functors and fires them with their payloads; a simple strategy pattern...
function processPulse (event, payload, dependancies) {
  return pulse[event].process(payload)
}

// Connect to a 3rd party to track more analytics...
/*
function initDetailTracking (enabled) {
  if (enabled) {
    // This is an example script - don't forget to change it!
    LogRocket.init('piz2la/experience-engine')
    LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
      name: 'James Morrison',
      email: 'jamesmorrison@example.com',

      // Add your own custom user variables here, ie:
      subscription: 'pro',
      foo: 'bar',
      alt: {
        lat: 100,
        long: 200
      }
    })
  }
}
*/
function getIP (onNewIP) { //  onNewIp - your listener function for new IPs
  // Compatibility for firefox and chrome
  const MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
  let pc = new MyPeerConnection({ iceServers: [] })
  let noop = function () {}
  let localIPs = {}
  let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g

  function iterateIP (ip) {
    if (!localIPs[ip]) onNewIP(ip)
    localIPs[ip] = true
  }

  // create a bogus data channel
  pc.createDataChannel('')

  // create offer and set local description
  pc.createOffer().then(function (sdp) {
    sdp.sdp.split('\n').forEach(function (line) {
      if (line.indexOf('candidate') < 0) return
      line.match(ipRegex).forEach(iterateIP)
    })
    pc.setLocalDescription(sdp, noop, noop)
  }).catch(function (reason) {
    // An error occurred, so handle the failure to connect
  })

  // listen for candidate events
  pc.onicecandidate = function (ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
  }
}

getIP(function (ip) {
  internalIP = ip
})

export default async (dependancies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependancies
  const { Vue, store } = dependancies
  const config = store.state.config
  Timeline.getSourceExperienceToken()
  Vue.prototype.$pulse = (event, payload) => {
    const hasToken = store.state.config.app.session.experienceToken
    if (!hasToken) {
      Timeline.getSourceExperienceToken().then(data => {
        store.dispatch('config/setExperienceToken', data.token)
      })
    }
    // Allow someone to disable pulses in a distribution, and do not use pulses if a distribution isn't loaded...
    if (config.app.settings.pulse.enabled) {
      if (config.app.session.distribution !== 0) {
        if (pulse[event]) {
          if (pulse[event].ignore) return
          const data = processPulse(event, payload, dependancies)
          Vue.prototype.$event.emit(event, data)
          if (data.t) data.t = parseFloat(data.t.toFixed(3))
          store.commit('config/updateUser', { path: pulse[event].update, data: JSON.parse(JSON.stringify(data)), event })
          data.s = dependancies.store.state.config.app.session.time
          _savePulse({ event: pulse[event].id, data }, payload, event)
        }
      } else {
        // console.log('Pulse disabled due to the distribution not being loaded')
      }
    }
  }

  // Set to true to track additional details and screen recording
  // initDetailTracking(false)

  // saves events to localStorage, if they are larger than a certain threshold, or more than 5 seconds has passed, store them
  async function _savePulse (event, originalPayload, originalEvent) {
    const activation = originalPayload
    let type
    switch (originalEvent) {
      case 'activationDisplay':
        type = 'display'
        break
      case 'activationAction':
        type = 'action'
        break
      case 'activationTouch':
        type = 'touch'
        break
      case 'activationEngagement':
        type = 'engagement'
        break
      default: type = originalEvent
    }
    if (!hasLocalStorage()) return false
    const pulseData = JSON.parse(localStorage.getItem('pulse')) || {
      distribution: config.app.data.distribution.id,
      session: config.app.session.id,
      production: config.app.data.production.id,
      organization: config.app.data.organization.id,
      domain: config.app.data.domain.id,
      creator: config.app.user.id,
      activation,
      type,
      events: []
    }
    const pulsedEvent = { e: event.event, d: event.data } // reduce the event/data names
    pulseData.events.push(pulsedEvent)
    localStorage.setItem('pulse', JSON.stringify(pulseData))
    // console.log('PROCESS PULSE HOOKS', originalEvent, originalPayload, pulseData, config)
    processPulseHooks(originalEvent, originalPayload, pulseData, config)
    // If a heartBeat or stop event occurred, flush the pulsedata to the server...
    if (event.event === 0 || event.event === 23) {
      // Save events and clear localstorage...
      try {
        // await Vue.prototype.$axios({ method: 'POST', url: config.app.settings.pulse.url, data: pulseData })
        // data = result.data.data
        localStorage.removeItem('pulse')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        // If more than 1000 pulse records, we need to purge things!
        if (pulseData.events.length > 1000) localStorage.removeItem('pulse')
      }
    } else {
      // Just add the item to localStorage...
      localStorage.setItem('pulse', JSON.stringify(pulseData))
    }
    if (event.event === 22 || event.event === 23 || event.event === 30 || event.event === 31 || event.event === 32) {
      const meta = config.app.events.find(d => {
        return (d.id && !!originalPayload && (d.id === originalPayload || d.id === originalPayload.id))
      })
      const metaName = meta ? meta.name ? meta.name : meta.id ? meta.id : null : null
      const metaId = meta ? meta.externalId ? meta.externalId : meta.id ? meta.id : null : null

      const _body = {
        event: event,
        e: event.event,
        type,
        dist: config.app.data.distribution.id,
        distName: config.app.data.distribution.slug,
        campaigns: meta ? meta.campaigns : null,
        sess: `${config.app.session.id}`,
        meta: `${metaId}`,
        metaName: `${metaName}`,
        payload: { ...event, ...pulseData },
        organization: config.app.data.organization.id
      }
      const $experienceToken = store.state.config.app.session.experienceToken
      Vue.prototype.$common.timeline.postSourceExperienceToken($experienceToken, pulseData)
      await Vue.prototype.$common.timeline.internalAnalytics(_body)
    }
  }
  // Check the pulse for hooks and run through them all if they exist...
  function processPulseHooks (event, payload, data, config) {
    // If pulse hooks are defined for this pulse...
    if (config.app.settings.pulse && config.app.settings.pulse.hooks && config.app.settings.pulse.hooks[event]) {
      // Get all the hooks...
      const hooks = config.app.settings.pulse.hooks[event]

      if (hooks.length > 10) {
        return
      }

      // Run through each hook...
      hooks.forEach(hook => {
        // The query result is true, or the result of the hook.query...
        let result = hook.query ? jsonata(hook.query).evaluate(payload) : true
        // If there is a result, fire the trigger...
        if (result) {
          Vue.prototype.$axios({ method: 'POST', url: hook.url, data })
        }
      })
      // Run each pulse query...
    }
  }

  // Start pulse now that it's defined...
  Vue.prototype.$pulse('start')
  // Stop pulse when the user leaves the page...
  window.addEventListener('beforeunload', e => { Vue.prototype.$pulse('end') })
}
