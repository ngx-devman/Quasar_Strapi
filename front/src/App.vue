<template>
  <div id="q-app" @mouseover="mouseover" @mouseleave="mouseleave" @click="click" class="text-white sdApp">
    <console/>
    <div v-if="$config.loaded">
      <router-view v-if="experience && !$config.error" />
      <diagnostics v-else/>
    </div>
    <loading v-else/>
  </div>
</template>
<script>
/* eslint-enable no-console */
import diagnostics from 'components/diagnostics'
import loading from 'components/loading'
import { hasLocalStorage } from 'boot/storage'
export default {
  name: 'App',
  components: { diagnostics, loading },
  debug: {
    context: 'App'
  },
  commands: {
    help () {
      return {
        guide: `Lists this help section. If voice commands are enabled, they will be read to you.<br/>You can also get specific and more detailed help by choosing 'help' followed by the command you'd like more details about.`,
        command () {
          return this.$console.guide()
        }
      }
    },
    error () {
      return {
        guide: `Generates an error (for testing)`,
        command (args) {
          this.$playerjs.receiver.emit('error', args[0])
          return `Error generated with value "${args[0]}"`
        }
      }
    },
    pjs () {
      return {
        guide: `Generates a Player.js event for a listening parent (for testing)`,
        command (args) {
          this.$playerjs.receiver.emit(args[0], args[1])
          return `Player.js message generated "${args[0]}" with value "${args[1]}"`
        }
      }
    },
    config () {
      return {
        guide: `Exports the entire config or part of it<br/>Usage: config [path]`,
        command (args) {
          let cfg = args[0] ? this.$common.get(this.$app, args[0]) : this.$app
          /* eslint-disable no-console */
          console.log(`Config${args[0] ? '.' + args[0] : ''}:`, this.$common.clone(cfg))
          /* eslint-enable no-console */
          return `Config sent to JS console`
        }
      }
    },
    set () {
      return {
        guide: `Sets part of config.<br/>Usage: set path value`,
        command (args) {
          if (!args[0]) return 'You need to provide a path'
          if (!args[1]) return 'You need to provide a value'
          function createPath (path, value, obj = {}) {
            var ref = obj
            path.split('.').forEach((key, index, arr) => {
              ref = ref[key] = index === arr.length - 1 ? value : {}
            })
            return obj
          }
          let obj = createPath(args[0], args[1])
          this.$store.commit('config/mergeState', obj)
          /* eslint-disable no-console */
          console.log(`Config:`, this.$common.clone(this.$app))
          /* eslint-enable no-console */
          return `Config set: ${JSON.stringify(obj)}`
        }
      }
    },
    'disable-loggers' () {
      return {
        guide: 'Modify method/event logs. <br /> ' +
        'Usage: disable-loggers set method:timeupdate,event:play <br /> ' +
        'Usage: disable-loggers set method:* <br />' +
        'Usage: disable-loggers get',
        command ([action, ...args]) {
          if (action === 'get') {
            return this.$console.logger.getDisabled()
          } else if (action === 'set') {
            if (!args || args.length === 0) return 'A new value must be specified.'
            const [val] = args
            this.$console.logger.setDisabled(val)
            return `disable-loggers is updated to: ${val}`
          } else {
            return 'Unknown action.'
          }
        }
      }
    }
  },
  // Core realtime functions, making sure if something needs to happen, it happens here...
  realtime: {
    // Something in the platform needs to change...
    update (payload) {
      this.debug('Got update:', payload)
      this.$store.commit('config/mergeState', { [payload.path]: payload.data })
    }
  },
  created () {
    // This should be the only console.log in the whole app :)
    /* eslint-disable no-console */
    console.log(`Experience Engine[UI:v${process.env.SOURCE_UI_VERSION}]`, window.SourceDigital)
  },
  async mounted () {
    this.reboot()
    // Listen for player.js messages...
    window.onmessage = (event) => {
      let msg = ''
      try {
        msg = JSON.parse(event.data)
      } catch (error) {
        return
      }
      if (msg.context !== 'player.js') return
      switch (msg.method) {
        case 'reboot':
          this.reboot()
          break
      }
    }
    this.$zendesk.load('key')
  },
  methods: {
    // Try to reboot...
    async reboot () {
      if (window.SourceDigital) {
        window.SourceDigital.vm = this.externalScope
        const uiInfo = {
          version: process.env.SOURCE_UI_VERSION,
          buildTime: process.env.BUILD_TIME
        }
        window.SourceDigital.version = Object.assign({}, window.SourceDigital.version, { ui: uiInfo })
        if (!isNaN(this.experience) && hasLocalStorage()) localStorage.setItem('distId', this.experience)
        var jwtAccess = this.getUrlVars()['jwt_access']
        if (typeof jwtAccess !== 'undefined' && hasLocalStorage()) {
          var tokenValue = localStorage.getItem('token')
          if (typeof tokenValue === 'undefined' || tokenValue === '' || tokenValue === null) {
            const id = localStorage.getItem('distId')
            localStorage.setItem('token', jwtAccess)
            await this.$router.push(`/${id}`)
            this.$router.go()
          }
        }
        this.$store.dispatch('config/hydrate', this.experience)
        window.SourceDigital.event = this.$event

        // Start Pulse/Billing...
        this.$pulse('start')
        // Set distribution for analytics
        const { name, slug } = window.SourceDigital.config.data.distribution
        this.$setAnalytics(name, slug)

        // eslint-disable-next-line camelcase
        const { utm_medium, utm_source, utm_campaign, utm_content, utm_term } = this.getUrlVars()
        this.$store.dispatch('config/setUTMParams', {
          utm_medium,
          utm_source,
          utm_campaign,
          utm_content,
          utm_term
        })
      }
    },
    // This is callable from the main window (externally)
    externalScope (payload) {
      return this
    },
    getUrlVars () {
      var vars = {}
      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value
      })
      return vars
    },
    removeLocalStorageData () {
      localStorage.removeItem('token')
    },
    mouseover (e) {
      this.$pulse('focusOnExperience', e)
    },
    mouseleave (e) {
      this.$pulse('focusOffExperience', e)
    },
    click (e) {
      this.$pulse('touch', e)
    }
  },
  computed: {
    experience () {
      return window.SourceDigital.distribution.id
    }
  },
  watch: {
    // Reload the app if the experience changes...
    '$route.params.experience' (next, last) {
      if (last) location.reload()
    },
    // Applying i18n / Internationalization...
    '$config.loaded' (next, last) {
      if (this.$app.settings.language) {
        this.debug('Internationalization:', this.$app.settings.language)
        this.$i18n.locale = this.$app.settings.language
      }
    }
  }
}
</script>
