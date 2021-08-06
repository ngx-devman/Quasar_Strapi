import playerjs from 'player.js'

export default class PlayerjsPlayerBuilder {
  constructor (el) {
    this.el = el
    this.info = null
    this.listeners = {}
    this.instance = null
  }
  on (name, handler) {
    this.listeners[name] = handler
    return this
  }
  removeAllEventListeners () {
    if (!this.instance) return
    Object.entries({ ...this.listeners }).forEach(([name, handler]) => {
      try {
        this.instance.off(name, handler)
      } catch (e) {
        console.error(e)
      }
    })
  }
  build () {
    this.instance = new playerjs.Player(this.el)

    this.instance.on('ready', (info) => {
      this.info = info
      Object.entries({ ...this.listeners }).forEach(([name, handler]) => {
        this.instance.on(name, handler)
      })
      this.instance.send({ method: 'initialize' })
    })
    return this
  }
}
