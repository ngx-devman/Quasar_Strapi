import ee from 'experience-engine'
import { uid, extend } from 'quasar'
import media from './common/media'
import events from './common/events'
import user from './common/user'
import formats from './common/formats'
import timeline from './common/timeline'
import { ucFirst, isEqual, diff, toHumanTime, timeSince, timeUntil, clone } from './common/general'
import products from './common/products'
import experience from './common/experience'
import playerjs from './common/playerjs'
import api from './common/api'
import validation from './common/validation'
import behavior from './common/behavior'
import alert from './common/alert'
import EventEmitter2 from 'eventemitter2'
import * as VueGoogleMaps from 'vue2-google-maps'
import PortalVue from 'portal-vue'
import sdImg from 'components/sdImg.vue'
import SourceCode from 'components/sourceCode.vue'
import constants from './common/variables'
import SocialShare from 'vue-social-sharing'
// Merges the existing state with the incomming payload...
const merge = (obj, args) => {
  return extend(true, obj, ...args)
}

const uuid = () => {
  let uuid = uid()
  return uuid.substr(0, 14) + '4' + uuid.substr(15)
}

const event = new EventEmitter2({
  // set this to `true` to use wildcards. It defaults to `false`.
  wildcard: true,
  // the maximum amount of listeners that can be assigned to an event, default 10.
  maxListeners: 20,
  // show event name in memory leak message when more than maximum amount of listeners is assigned, default false
  verboseMemoryLeak: false
})

export default (dependencies) => {
  // const { app, router, store, Vue, redirect, urlPath } = dependencies
  const { Vue } = dependencies

  Vue.use(SocialShare)
  Vue.use(PortalVue)
  Vue.use(VueGoogleMaps, { load: { key: 'AIzaSyC4Gr2t_BrfWas1KONAK5uwf9kGSATCT-A', libraries: 'places' } })
  Vue.component('sd-img', sdImg)
  Vue.component('source-code', SourceCode)
  playerjs(dependencies)

  Vue.prototype.$ee = ee
  Vue.prototype.$common = {
    activations: ee.activations,
    extend,
    merge,
    uuid,
    timeline,
    event,
    get: ee.util.get,
    diff,
    clone,
    isEqual,
    toHumanTime,
    timeSince,
    timeUntil,
    ucFirst,
    constants,
    experience: experience(dependencies),
    validation: validation(dependencies),
    behavior: behavior(dependencies),
    products: products(dependencies),
    formats: formats(dependencies),
    events: events(dependencies),
    alert: alert(dependencies),
    media: media(dependencies),
    user: user(dependencies),
    api: api(dependencies)
  }
}
