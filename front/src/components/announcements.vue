<template>
  <div v-if="enabled">
    <div
      class="row text-center full-width text-white absolute announcements"
      :class='$q.screen.gt.xs ? "q-pa-sm text-h5" : "q-pa-xs text-caption"'
    >
      <div @click="action" class="col">{{message}}</div>
      <q-btn @click="dismiss" round color="white" style="max-height: 42px" text-color="grey-9" size="md" icon="close" />
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    // If on iOS, announce that fullscreen in an embed is better experienced on its own...
    if (this.$behavior.exists('iOSFullscreenEmbedAnnouncement') && this.$q.platform.is.ios && this.$q.platform.within.iframe) {
      this.message = `Tap here for a full screen view.`
      this.enabled = true
    }

    /*
    // We aren't doing this anymore as YouTube has a live feature...
    if (this.$appSettings('live.event.when')) {
      this.enabled = true
      this.updateTime()
      this.$options.interval = setInterval(this.updateTime, 1000)
    }
    this.checkIfEventEnded()
    */
  },
  methods: {
    // What to do when clicked on...
    action () {
      if (this.$behavior.exists('iOSFullscreenEmbedAnnouncement') && this.$q.platform.is.ios && this.$q.platform.within.iframe) {
        // window.location.replace(`${this.$config.host}${this.$app.session.distribution}`)
        window.open(`${this.$config.host}${this.$app.session.distribution}`, '_blank')
      }
    },
    dismiss () {
      this.enabled = false
    }
  },
  /*
  beforeDestroy () {
    // clearInterval(this.$options.interval)
  },
  methods: {
    updateTime () {
      const when = this.$appSettings('live.event.when')
      this.happened = !(this.$common.timeUntil(when, false) < 0)
      this.secondsLeft = this.$common.timeUntil(when, false)
      this.timeLeft = this.$common.timeUntil(when)
      this.duration = this.$app.content.duration
      this.message = this.$appSettings(`live.event.messages.${this.happened ? 'pre' : 'post'}`) + this.timeLeft
      // Did this event start...
      if (this.secondsLeft < 0 && this.settings.event.type.redirect.to !== null) {
        window.location.replace(this.settings.event.type.redirect.to)
      }
    },
    checkIfEventEnded () {
      const secondsSinceEventEnded = this.secondsLeft + this.$app.content.duration
      if (secondsSinceEventEnded < 0) {
        this.endedEvent = true
      }
    }
  },
  */
  data () {
    return {
      // timeLeft: '',
      // secondsLeft: 0,
      // duration: 0,
      // endedEvent: null,
      message: '',
      enabled: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.announcements
  cursor: pointer
  background: rgba(0,0,0,0.5)
  z-index 99999
</style>
