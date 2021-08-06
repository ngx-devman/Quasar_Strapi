import playerjs from 'player.js'

// backup
// const PLAYERJS_METHODS = { ...playerjs.METHODS }
// const PLAYERJS_EVENTS = { ...playerjs.EVENTS }

const formatNames = (first, ...rest) => {
  const arr = Array.isArray(first) ? first : [first, ...rest]
  return arr
    .reduce((obj, item) => {
      obj[item.toUpperCase()] = item
      return obj
    }, {})
}

export default class PlayerjsReceiverManager {
  constructor () {
    this.methods = {}
    this._methods = {}
    this.supportedEvents = new Set()
    this.instance = null
    this.onMethod = () => {}
  }

  initNew () {
    const instance = this.instance
    if (instance) {
      // Clean all methods
      Object.entries(this._methods).forEach(([name, handler]) => {
        instance.off(name, handler)
      })
    }
    this.methods = {}
    this._methods = {}
    this.supportedEvents.clear()
    return this
  }

  addMethod (name, handler) {
    if (name === '*') this.onMethod = handler
    else this.methods[name] = handler
    return this
  }
  addEvent (name) {
    this.supportedEvents.add(name)
    return this
  }
  addEvents (names) {
    names.forEach(name => this.addEvent(name))
    return this
  }
  commit () {
    // expand support
    playerjs.METHODS = { ...playerjs.METHODS, ...formatNames(Object.keys(this.methods)) }
    playerjs.EVENTS = { ...playerjs.EVENTS, ...formatNames([...this.supportedEvents]) }
    this.instance = new playerjs.Receiver({
      ...formatNames([...this.supportedEvents])
    }, {
      ...formatNames(['addEventListener', 'removeEventListener', ...Object.keys(this.methods)])
    })
    Object.entries({ ...this.methods }).forEach(([name, handler]) => {
      const _handler = (...args) => {
        this.onMethod(name, ...args)
        handler(...args)
      }
      this._methods[name] = _handler
      this.instance.on(name, _handler)
    })
  }
}
