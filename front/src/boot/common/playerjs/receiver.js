import PlayerjsReceiverManager from './utils/receiver-manager'
import { Platform } from 'quasar'

const receiverManager = new PlayerjsReceiverManager()

function toString (val) {
  if (typeof val === 'object') return JSON.stringify(val)
  if (typeof val === 'function') return '[callback]'
  if (typeof val === 'undefined' || val === null) return ''
  return val
}

export default function setupReceiver (dependencies) {
  const { Vue, store } = dependencies
  return {
    initNew () {
      return receiverManager.initNew()
        .addMethod('*', (method, arg1) => {
          Vue.prototype.$console.log('debug', `method:${method}`, `>> Player.js: ${method}(${toString(arg1)})`)
        })
        .addEvents(['activation', 'action', 'activationScroll', 'error', 'click'])
        .addMethod('getConfig', (cb) => cb(window.SourceDigital.config))
        .addMethod('getContent', (cb) => cb(window.SourceDigital.config.content))
        .addMethod('getMetadata', (cb) => cb(window.SourceDigital.config.data))
        .addMethod('getPlatform', (cb) => cb(Platform.is))
        .addMethod('setActivations', (value) => store.dispatch('config/setEvents', value))
        .addMethod('getActivations', (cb) => cb(store.state.config.app.rawEvents))
        .addMethod('orientation', (forcedOrientation) => store.dispatch('config/layoutChange', { forcedOrientation }))
    },
    emit (event, arg1, ...args) {
      if (!receiverManager.instance) {
        console.error('playerjs.receiver is not initialized yet.')
        return
      }
      Vue.prototype.$console.log('debug', `event:${event}`, `<< Player.js: ${event}(${toString(arg1)})`)
      receiverManager.instance.emit(event, arg1, ...args)
    },
    ready () {
      if (!receiverManager.instance) {
        console.error('playerjs.receiver is not initialized yet.')
        return
      }
      Vue.prototype.$console.log('debug', 'event:ready', '<< Player.js: ready()')
      receiverManager.instance.ready()
    },
    instance: () => receiverManager.instance
  }
}
