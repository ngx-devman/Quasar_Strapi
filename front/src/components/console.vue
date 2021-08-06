<template>
  <div class="console-panel" :class="{ shown: isShown }">
    <div ref="display" class="console-display">
      <div v-for="(item, index) in logs" :key="index" v-html="item" >
      </div>
    </div>
    <input v-model="cmd" ref="input" :placeholder="config.placeholder" @keydown="keyhandler" class="console-input" />
  </div>
</template>

<script>
import wcMatch from 'wildcard-match'
// This is the infrastructure that toggles the console (via browser core so there is no interference)...
function createHotkeyListener (self, key) {
  return function (e) {
    if (e.keyCode !== key) return
    self.toggle()
    e.preventDefault()
  }
}

const defaultConfig = {
  hotkey: 192, // '~'
  disabledLoggers: 'event:timeupdate',
  onShow: null,
  onHide: null,
  onEnter: null,
  onToggle: null,
  placeholder: 'Command?',
  helpCmd: 'help',
  defaultHandler: null,
  caseSensitive: false,
  historySize: 256,
  welcome: `Welcome to the Experience Engine!<br>
        Press up or down for history. Try "help" if you're lost<br/>`
}

export default {
  name: 'v-console',
  props: {
    settings: { type: Object, required: false }
  },
  data () {
    return {
      config: {
        ...defaultConfig
      },
      cmd: '', // The current console command
      logs: [], // The log stack
      history: [],
      historySelector: 0,
      commands: {},
      isShown: false,
      consolePos: 0
    }
  },
  destroyed () {
    this.hotkeyListener && window.removeEventListener('keydown', this.hotkeyListener)
  },
  created () {
    this.$console.log = this.log
    this.$console.dispatch = this.dispatch
    this.$console.toggle = this.toggle
    this.$console.guide = this.guide
    const self = this
    this.$console.logger = {
      getDisabled: () => self.config.disabledLoggers,
      setDisabled: val => { self.config.disabledLoggers = val }
    }
    this.hotkeyListener = createHotkeyListener(this, this.config.hotkey)
    window.addEventListener('keydown', this.hotkeyListener)
    if (this.settings) this.config = Object.assign({}, defaultConfig, this.settings)
  },
  methods: {
    toggle () {
      if (this.config.onToggle) this.config.onToggle.bind(this)()
      if (this.isShown) {
        if (this.config.onShow) this.config.onShow.bind(this)()
        this.$refs.input.blur()
        this.isShown = false
      } else {
        if (this.config.onHide) this.config.onHide.bind(this)()
        this.$refs.input.focus()
        this.isShown = true
      }
    },
    keyhandler (e) {
      // e.preventDefault()
      // if (!this.config.caseSensitive) this.cmd = this.cmd.toLowerCase()
      switch (e.keyCode) {
        case 13: // Enter
          this.history.unshift(this.cmd) // Save history
          this.log('command', this.cmd) // Execute command
          if (this.history.length > this.config.historySize) this.history = this.history.splice(0, this.config.historySize)
          this.dispatch(this.cmd)
          this.historySelector = -1 // Select last history item
          this.cmd = '' // Clear command input
          break
        case 38: // Up Arrow
          if (this.history[this.historySelector + 1] !== undefined) {
            this.historySelector++
            this.cmd = this.history[this.historySelector]
          }
          break
        case 40: // Down Arrow
          if (this.history[this.historySelector - 1] !== undefined) {
            this.historySelector--
            this.cmd = this.history[this.historySelector]
          }
          break
        case 39: // Right Arrow
          this.historySelector = -1
          this.history[0] = this.cmd = this.autoComplete()
          break
        default:
          this.historySelector = -1
      }
    },
    autoComplete () { // Converted
      if (this.cmd === '') return this.cmd
      var filterFn = function (handlerName) {
        return handlerName.indexOf(this.cmd) === 0
      }
      var matched = Object.keys(this.commands).filter(filterFn)
      switch (matched.length) {
        case 0:
          return this.cmd
        case 1:
          return matched[0] + ' '
        default:
          this.log('message', this.cmd)
          this.printHelp(filterFn)
          return this.cmd
      }
    },
    isLoggerEnabled (loggerName) {
      if (!loggerName) return false
      return !wcMatch(this.config.disabledLoggers.split(',').map(i => i.trim()))(loggerName)
    },
    log (type, ...args) { // Writes a command to the log...
      switch (type) {
        case 'command':
          this.logs.push('<span class="console-user-input">' + args.join(' ') + '</span>') // Sanitize
          break
        case 'message':
          this.logs.push(args.join(' '))
          break
        case 'debug':
          const [loggerName, ...rest] = (args || [])
          if (this.isLoggerEnabled(loggerName) && rest && rest.length > 0) {
            this.logs.push(rest.join(' '))
          }
          break
        default:
          this.logs.push([type, ...args].join(' '))
      }
      this.$nextTick(function () { this.$refs.display.scrollTop = this.$refs.display.scrollHeight })
    },
    dispatch (str) { // Dispatches commands to be executed...
      var parts = str.split(' ')
      var name = this.config.caseSensitive ? parts[0] : parts[0].toLowerCase()

      if (this.$console.commands[name]) {
        var command = this.$console.commands[name].command
        var result
        result = command(parts.splice(1))
        if (result) this.log('message', result)
      } else {
        this.log('message', `<div class="console-guide-tip">Unknow command. Try ${this.config.helpCmd}</div>`)
      }
    },
    guide () {
      var guide = ''
      Object.keys(this.$console.commands).sort().forEach(name => {
        guide += '<div class="console-guide-heading">' + name + '</div>' +
          '<div class="console-guide-detail">' + this.$console.commands[name].guide + '</div>'
      })
      return guide
    }
  }
}
</script>

<style>
  .console-panel {
    z-index: 99999;
    display: none;
    height: calc(50vh + 18px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    margin-top: calc(-50% - 18px);
    transition: margin-top 100ms ease-out 1ms;
  }

  .console-panel.shown {
    display: block;
    margin-top: 0;
  }

  .console-guide-tip { color: rgba(255, 255, 255, 0.9); }

  .console-guide-heading {
    font-size: 1.1em;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.9);
  }

  .console-guide-detail {
    font-size: 0.8em;
    padding-bottom: 1em;
    color: rgba(255, 255, 255, 0.8);
  }

  .console-display,
  .console-input {
    margin: 0;
    padding: 2px 5px;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    font: 14px/20px Menlo, monospace;
    color: #DDD;
    letter-spacing: 0.05em
  }

  .console-display {
    bottom: 18px;
    height: calc(100vh - 50vh);
    overflow-y: scroll;
  }

  .console-input {
    outline: none;
    background-color: transparent;
    border: 0;
    bottom: 0;
    line-height: 16px;
    padding: 4px 5px;
  }

  .console-user-input { color: #7E0 }
</style>
