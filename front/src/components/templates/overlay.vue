<template>
  <div>
    <div v-if="$app.settings.layout.template.index">
      <iframe
        frameborder="0" style="overflow:hidden;height:100vh;width:100%" height="100%" width="100%"
        :src="$app.settings.layout.template.index"
      ></iframe>
    </div>

    <div v-else class="relative-position video-wrapper sdExperienceTemplateVideo plyr--full-ui" style="right: 0;" @click="handleClick">
      <debug />
      <invisible-events :things="$app.session.invisibleEvents" />
      <q-responsive v-show="$app.layout.orientation === 'landscape'" :ratio='$app.settings.ratio ? $app.settings.ratio : 16/9 ' :class='$behavior.exists("hideVideoInPortraitOnOverlay") ? "orientation-landscape" : ""' style='max-height:100vh'>
      </q-responsive>
    </div>
  </div>
</template>

<script>
import invisibleEvents from 'components/invisibleEvents'
import throttle from 'lodash/throttle'
export default {
  name: 'video-template',
  props: ['fullscreenDetails'],
  components: { invisibleEvents },
  debug: {
    depth: 2,
    context: 'template:overlay'
  },
  data () {
    return {
      player: {
        currentTime: 0,
        playing: true,
        play () {
          this.playing = true
        },
        pause () {
          this.playing = false
        }
      }
    }
  },
  methods: {
    handleClick (e) {
      const evt = {
        x: e.clientX, y: e.clientY
      }
      this.$playerjs.receiver.emit('click', evt)
    },
    changeCurrentTime (time) {
      this.player.currentTime = time
      // this.$app.content.currentTime = time
    },
    play () {
      this.player.playing = true
    },
    pause () {
      this.player.playing = false
    },
    onPlayStatusUpdate () {
      this.$playerjs.receiver.emit(this.player.playing ? 'play' : 'pause')
    }
  },
  watch: {
    'player.playing': {
      handler (val) {
        this.onPlayStatusUpdate()
      }
    },
    'player.currentTime': {
      handler: throttle(function () {
        this.$playerjs.receiver.emit('timeupdate', { seconds: this.player.currentTime.toFixed(4) })
      }, 250)
    }
  },
  mounted () {
    this.$common.media.ref = this.player

    this.$playerjs.receiver.initNew()
      .addEvents(['play', 'pause'])
      .addMethod('play', () => { this.$set(this.player, 'playing', true) })
      .addMethod('pause', () => { this.$set(this.player, 'playing', false) })
      .addMethod('setCurrentTime', (value) => { this.$set(this.player, 'currentTime', parseInt(value)) })
      .addMethod('getPaused', (cb) => {
        const paused = !this.player.playing
        cb(paused)
      })
      .addMethod('getCurrentTime', (cb) => { cb(this.player.currentTime.toFixed(4)) })
      .commit()

    this.debug('Overlay template mounted')
    // this.$event.emit('contentReady')
    this.$playerjs.receiver.ready()
    this.onPlayStatusUpdate()
    // Set a 25fps counter...
    this.$_timer = setInterval(e => {
      if (this.player.playing) {
        this.player.currentTime += 0.05
      }
    }, 50)
  },
  beforeDestroy () {
    this.debug('Overlay template unmounted')
    if (this.$_timer) clearInterval(this.$_timer)
  }
}
</script>
