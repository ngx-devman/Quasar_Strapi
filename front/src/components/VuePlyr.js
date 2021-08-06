/**
 * Taken from: https://github.com/redxtech/vue-plyr/blob/master/src/vue-plyr.vue
 * to manually control plyr version to fix a vimeo bug for Chrome 88
 */
import Plyr from 'plyr'
export default {
  name: 'VuePlyr',
  props: {
    /** Options object for plyr config. **/
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      player: {}
    }
  },
  computed: {
    opts () {
      const options = this.options
      if (
        !Object.prototype.hasOwnProperty.call(
          this.options,
          'hideYouTubeDOMError'
        )
      ) {
        options.hideYouTubeDOMError = true
      }
      return options
    }
  },
  mounted () {
    this.player = new Plyr(this.$el, this.opts)
  },
  beforeUnmount () {
    try {
      this.player.destroy()
    } catch (e) {
      if (
        !(
          this.opts.hideYouTubeDOMError &&
          e.message === 'The YouTube player is not attached to the DOM.'
        )
      ) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  },
  render () {
    const slots = this.$slots.default
    return typeof slots === 'function' ? slots()[0] : slots
  }
}
