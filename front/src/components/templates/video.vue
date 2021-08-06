<template>
  <div class="all-pointer-events relative-position video-wrapper sdExperienceTemplateVideo" style="right: 0;">
    <debug/>
    <!-- <announcements v-if="!$behavior.exists('hideAnnouncements')" /> -->
    <autoPlayDisclaimer v-if="showDisclaimer" @unmute='autoPlayUnmute' :position='$app.settings.layout.autoplayDisclaimer'/>
    <invisible-events :things="$app.session.invisibleEvents" />
    <q-responsive @click='playOnMobile' :ratio='$app.settings.ratio ? $app.settings.ratio : 16/9 ' :style="[$q.fullscreen.isActive && { height:'100vh' }]" style='max-height:100vh'>
      <vue-plyr class='sd-video' :class="playerClasses" ref="plyr" :options="{ clickToPlay: $q.platform.is.desktop, vimeo: { controls: false, muted: muted, autoplay: autoplay }, youtube: { mute: muted, autoplay: autoplay }, muted: muted, invertTime: false, controls: controls, storage: { enabled: false } }">
        <!-- HTML 5 video -->
        <video :muted="muted" data-setup='{}' controls playsinline ref="vPlayer" v-if="$app.content.source === 'html5'" :poster="$app.content.cover.url">
          <source :src="productionMedia ? productionMedia : $app.content.media" type="video/mp4" />
        </video>
        <!-- YouTube video -->
        <div class="fit plyr__video-embed" v-else-if="$app.content.source === 'youtube'">
          <iframe
            :src="`https://www.youtube.com/embed/${productionMedia ? productionMedia : $app.content.media}?iv_load_policy=3&playsinline=1&modestbranding=1&showinfo=0&rel=0&enablejsapi=1`"
            allowfullscreen allowtransparency allow="autoplay">
          </iframe>
        </div>
        <!-- Vimeo video -->
        <div class="fit plyr__video-embed" v-else-if="$app.content.source === 'vimeo'">
          <iframe style="height:500px"
            :src="`https://player.vimeo.com/video/${productionMedia ? productionMedia : $app.content.media}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`"
            allowfullscreen allowtransparency allow="autoplay">
          </iframe>
        </div>
      </vue-plyr>
    </q-responsive>
  </div>
</template>

<script>
import invisibleEvents from 'components/invisibleEvents'
import { mapGetters } from 'vuex'
import autoPlayDisclaimer from 'components/autoPlayDisclaimer'

export default {
  name: 'video-template',
  props: ['searchItem', 'fullscreenDetails'],
  components: { invisibleEvents, autoPlayDisclaimer },
  debug: {
    depth: 2,
    context: 'template:video'
  },
  events: {
    layoutChange () {},
    // Requirement: On mobile devices, automatically enter/leave fullscreen when switching in/out of it on video experiences.
    // Issue: For Android, requires "initiation by user gesture"
    mobileOrientation (orientation) {
      if (orientation === 'portrait' && this.ready && this.$q.platform.is.mobile) {
        this.debug('mobileOrientation (portrait)')
        // if (!this.$q.platform.is.android)
        // this.player.fullscreen.exit()
        this.mobileOrientation = 'portrait'
      }
      if (orientation === 'landscape' && this.ready && this.$q.platform.is.mobile) {
        this.debug('mobileOrientation (landscape)')
        // if (!this.$q.platform.is.android)
        // this.player.fullscreen.enter()
        this.mobileOrientation = 'landscape'
      }
    },
    // Clicking on the bigger play button, only on desktop
    togglePlay () {
      if (this.$q.platform.is.desktop) this.player.togglePlay()
    },
    // disable autoplay disclaimer
    toggleMute () {
      if (this.$behavior.exists('autoPlay')) this.showDisclaimer = false
    },
    callingProxy (event) {
      event.stopPropagation()
      this.$event.emit('toggleProxy')
    },
    showVideoControls (e) { this.player.config.hideControls = e }
  },
  data () {
    return {
      ready: false,
      mobileOrientation: 'none',
      preventPause: false,
      playback: false,
      productionMedia: undefined,
      showDisclaimer: this.$behavior.exists('autoPlay')
    }
  },
  computed: {
    muted () {
      return this.$behavior.exists('autoPlay') || this.$behavior.exists('muted')
    },
    autoplay () {
      return this.$behavior.exists('autoPlay')
    },
    ...mapGetters({
      'counter': 'config/counter'
    }),
    player () {
      return this.$refs.plyr.player
    },
    controls () {
      let controls = `
              <button type="button" class="plyr__control plyr__control--overlaid" onclick="SourceDigital.event.emit('togglePlay')" aria-label="Play"><svg role="presentation" focusable="false"><use xlink:href="#plyr-play"></use></svg><span class="plyr__sr-only">Play</span></button>
              <div class="plyr__controls">
                  ${this.$q.platform.is.mobile ? '' : `<button type="button" class="plyr__controls__item plyr__control" aria-label="Play, {title}" data-plyr="play">
                      <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
                      <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
                  </button>`}
                  <div onclick="SourceDigital.event.emit('toggleMute')" class="plyr__controls__item plyr__volume sdVolumeBtnContainer">
                    <button type="button" class="plyr__control sdVolumeBtn" data-plyr="mute"><svg class="icon--pressed" aria-hidden="true" focusable="false"><use xlink:href="#plyr-muted"></use></svg><svg class="icon--not-pressed" aria-hidden="true" focusable="false"><use xlink:href="#plyr-volume"></use></svg></button>
                  </div>
                  ${this.$q.platform.is.mobile ? '<div style="width:10px;"></div>' : `<div class='plyr__controls__item plyr__volume sdVolumeRange'><input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume"> </div>`}
                  ${this.$behavior.exists('hideProgressBar') ? '' : `<div class="plyr__controls__item plyr__progress__container">
                    <div class="plyr__progress">
                      <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                      <progress class="plyr__progress__buffer" min="0" max="100" value="0" role="progressbar" aria-hidden="true">% buffered</progress>
                      <span role="tooltip" class="plyr__tooltip">00:00</span>
                    </div>
                  </div>`}
                  <div class="plyr__controls__item plyr__time--current plyr__time" aria-label="Current time">00:00</div>
                  <button type="button" class="plyr__controls__item plyr__control" data-plyr="captions">
                      <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
                      <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
                  </button>
                  ${this.$q.platform.is.ios ? '' : `<button type="button" class="plyr__controls__item plyr__control" onclick="SourceDigital.event.emit('toggleFullscreen')">
                      <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
                      <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
                  </button>`}
              </div>
              `
      return controls
    },
    playerClasses () {
      return {
        'pointer-events-none': this.preventPause,
        'plyr--init-hide-controls': this.$behavior.exists('hidePlayerControls')
      }
    },
    // Decide which player contols are used...
    playerControls () {
      let controls = [
        'play-large', // The play button in the center
        'play', // The play button on the bar
        'current-time', // The time remaining
        'mute', // A button to mute the adio
        'volume', // The volume slider
        'settings', // Settings to adjust playback speed/etc.
        'airplay' // Only shows on iOS
        // 'captions', // Only shows if captions are available
        // 'pip' // Allows picture-in-picture
      ]
      if (this.$behavior.exists('hideProgressBar')) {
      } else {
        controls.push('progress') // The progress/scrub bar
      }
      controls.push('fullscreen')
      return controls
    }
  },
  methods: {
    // unmutes video and hides disclaimer
    autoPlayUnmute () {
      this.player.muted = false
      this.showDisclaimer = false
    },
    handleContentReady () {
      this.ready = true
      this.$event.emit('contentReady')
      this.$playerjs.receiver.ready()
      // Trigger mobileOrientation once more if in mobile mode...
      if (this.$app.layout.mobileOrientation) this.$event.emit('mobileOrientation', this.$app.layout.mobileOrientation)
      if (this.$behavior.exists('autoPlay')) this.player.play()
      if (this.$behavior.exists('autoPlayWhenDirect') && !this.$q.platform.within.iframe) {
        setTimeout(() => {
          this.player.play()
        }, 2256)
      }
      // this.player.muted = this.$behavior.get('mute')
    },
    onVideoPause (e) {
      this.player.play()
      this.$q.notify({
        message: this.$t('disabledPause'),
        type: 'negative',
        position: 'center',
        timeout: 1200,
        badgeClass: 'hidden'
      })
    },
    togglePlayback () {
      this.playback = !this.playback
      if (this.playback) {
        this.debug('playing toggleplayback')
        this.player.play()
      } else {
        this.player.pause()
      }
    },
    // Allow container to control video playback state, only on mobile
    playOnMobile (e) {
      if (this.$q.platform.is.desktop) this.debug('Clicked on video')
      else this.player.togglePlay()
    }
  },
  mounted () {
    this.debug('video template mounted')
    this.debug('Hello there! :)', this.$app.settings.debug.enabled)

    const self = this
    this.$_eventHandlers = {
      play: () => self.$playerjs.receiver.emit('play'),
      pause: () => self.$playerjs.receiver.emit('pause'),
      ended: () => self.$playerjs.receiver.emit('ended'),
      timeupdate: () => self.$playerjs.receiver.emit('timeupdate', {
        seconds: self.player.currentTime, duration: self.player.duration
      }),
      progress: () => self.$playerjs.receiver.emit('buffered', { percent: self.player.buffered.length }),
      ready: self.handleContentReady
    }

    this.$playerjs.receiver.initNew()
      .addEvents(['play', 'pause', 'ended', 'timeupdate', 'buffered', 'fullscreen'])
      .addMethod('play', () => { this.player.play() })
      .addMethod('pause', () => { this.player.pause() })
      .addMethod('getPaused', (callback) => { callback(this.player.paused) })
      .addMethod('getCurrentTime', (callback) => { callback(this.player.currentTime) })
      .addMethod('setCurrentTime', (value) => { this.player.currentTime = value })
      .addMethod('getDuration', (callback) => { callback(this.player.duration) })
      .addMethod('getVolume', (callback) => { callback(this.player.volume) })
      .addMethod('setVolume', (value) => { this.player.volume = value })
      .addMethod('mute', () => { this.player.muted = true })
      .addMethod('unmute', () => { this.player.muted = false })
      .addMethod('getMuted', (callback) => { callback(this.player.muted) })
      .addMethod('getLoop', (callback) => { callback(this.player.loop) })
      .addMethod('setLoop', (value) => { this.player.loop = value })
      .commit()

    Object.entries(this.$_eventHandlers).forEach(([event, handler]) => {
      this.player.on(event, handler)
    })

    // checks if production exists
    const production = this.$app.data.distribution.production
    if (!!production && this.$app.data.production && this.$app.data.production.id === production) {
      // setup productionMedia if it exists
      this.productionMedia = this.$app.data.production.media || false
      // eslint-disable-next-line
      console.log(this.productionMedia)
    }
    // let plyrVideoWrapper = document.getElementsByClassName('plyr--full-ui')
    // console.log(plyrVideoWrapper)
    this.$common.media.ref = this.player
    // TODO: @angelica - Please put a reference to the issue you logged in plyr here so we can check if they patched this issue.
    // This fixes the wrongly left "plyr__poster" div on top of youtube videos...
    // if (this.$app.content.source === 'youtube') {
    //   this.$nextTick(() => {
    //     let plyrPosterExists = document.getElementsByClassName('plyr__poster')
    //     if (plyrPosterExists.length > 0) plyrPosterExists[0].style.display = 'none'
    //   })
    // }
    // when there's an activationId present, seek to activation's startTimeMs
    if (this.searchItem) {
      let sec = this.searchItem.startTimeMs / 1000 + 1
      // html5 support...
      if (this.player.isHTML5) {
        this.player.once('canplay', event => {
          this.player.currentTime = sec
        })
      } else {
        // pseudo 'canplay' function when html5 isn't supported; plays video to update the progress bar, and pauses it immediately
        this.player.once('ready', event => {
          this.player.forward(sec)
          setTimeout(() => { this.player.play() }, 50)
        })
        this.player.once('playing', event => { setTimeout(() => { this.player.pause() }, 50) })
      }
    }
    if (this.$behavior.exists('preventPause')) {
      this.player.on('play', event => {
        this.preventPause = true
      })
      this.player.on('pause', event => {
        if (!this.fullscreenDetails) this.onVideoPause()
      })
    }
  },
  beforeDestroy () {
    this.debug('video template unmounted')
    this.$common.media.ref = undefined
    if (this.player) {
      Object.entries(this.$_eventHandlers).forEach(([event, handler]) => {
        this.player.on(event, handler)
      })
    }
  }
}
</script>

<style lang="stylus">
  // .plyr__control svg
  //   height: 18px;
  //   width: 18px;
    //padding: 28px
  // /deep/.plyr--video .plyr__controls
  //   padding: 0 10px 10px
  .pointer-events-none .plyr__controls .plyr__controls__item:first-child
    cursor unset
    background transparent
  .plyr--init-hide-controls .plyr__controls
    opacity 0
</style>
