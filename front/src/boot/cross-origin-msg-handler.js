// const supportedOrigins = process.env.SUPPORTED_CROSS_ORIGINS || ['https://admin.sourcesync.io']

// const isOriginSupported = origin => {
//   if (origin === window.location.origin) return true
//   if (process.env.DEV && /^http:s?\/\/localhost:\d{4}/.test(origin) && window.location.origin !== origin) return true
//   return supportedOrigins.includes(origin)
// }

/**
 * Note: There's another message listener in front/embed.js, listening for the same context='SourceDigital'.
 * TODO: Merge two listeners
 */
export default ({ Vue }) => {
  const debug = {
    received: Vue.prototype.$debug.extend('cross-origin-msg:received'),
    sent: Vue.prototype.$debug.extend('cross-origin-msg:sent')
  }

  const eventHandlers = {
    setMetacontents: (data) => {
      Vue.prototype.$event.emit('$store.dispatch', 'config/setEvents', data)
    }
  }

  const parentMessageHandler = (message = {}) => {
    // const { origin } = message
    // For now we are allowing all origins--
    // however consider origin checks when we expose more events
    // if (!isOriginSupported(origin)) return
    let msgData
    if (!message.data) return
    if (typeof message.data === 'object') msgData = message.data
    else if (typeof message.data === 'string') {
      try {
        msgData = JSON.parse(message.data)
      } catch (e) { return }
    } else return
    if (msgData.context !== 'SourceDigital') return
    debug.received('data', msgData)
    const eventHandler = eventHandlers[msgData.event]
    if (!eventHandler) return
    eventHandler(msgData.value)
  }

  window.addEventListener('message', parentMessageHandler, false)
}
