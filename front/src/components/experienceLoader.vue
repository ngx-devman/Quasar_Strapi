<template>
  <div @mouseover="mouseover" @mouseleave="mouseleave" class="sdExperienceLoader text-white" id='ep' :class="{'isFullscreen' : isFullscreen }">
    <debug />
    <!-- <chat/> -->
    <cartBadge :contentReady='contentReady'/>

    <!-- <vue-json-pretty :data="$app" :deep="1" style="color: white"/> -->
    <div class="relative-position" :style="{ maxHeight: $q.screen.height }">
      <q-resize-observer @resize="onResize" />
      <component v-if="$app.content.type !=='dynamic'" :is="$app.content.type+'-template'" :searchItem='searchItem' class="media" style="overflow:hidden;"/>
      <component v-else :is="$app.settings.layout.template.type+'-template'" :searchItem='searchItem' class="media" style="overflow:hidden;"/>
    </div>

   <div
    v-if="videoHeight !==null"
    :id="dest === 'footer' ? 'underlay' : 'overlay'"
    class="entertainment-wrapper"
    :class="{
      'absolute-full no-pointer-events': dest === 'overlay',
      'relative-position': dest === 'footer',
      'overflow-hidden': $app.content.type !== 'overlay' || !$q.platform.within.iframe,
      'transparent': dest === 'footer' && $q.platform.within.iframe,
      'bg-black': dest === 'footer' && !$q.platform.within.iframe
    }"
    :style="[
      dest === 'footer' && { height: underlayHeight + 'px' },
      dest === 'overlay' && { height: videoHeight + 'px' }
    ]"
    @click="onWrapperClick"
   >
      <div v-if="$app.settings.debug.enabled">
        <div v-if="$app.settings.debug.time" class="debugTime">
          {{debugTime}} <span v-if="$app.settings.debug.activations">{{$app.session.visibleEvents.length}}</span>
        </div>
      </div>
      <transition appear name='sdSlideZoom'>
        <entertainment-plus
          v-show="showEntertainmentPlus"
          :things="$app.session.visibleEvents"
          :list="dest"
          :class="['entertainment-' + dest, 'entertainment__' + $app.content.type]"
          class="sdExperiencePlus full-width"
          :video-height="videoHeight"
          :searchItem='searchItem'
          @isShowDetails='isShowDetails'
          @showProfile='showProfile'
          @isShowingCart='isShowingCart'
        />
      </transition>
    </div>
    <div v-if="dest === 'overlay' && !$behavior.exists('ignoreUnderlayHeight')" :class="[ $q.platform.within.iframe ? 'bg-transparent' : 'bg-black' ]" :style="{ height: underlayHeight + 'px' }"/>
  </div>
</template>

<script>
import vueJsonPretty from 'vue-json-pretty'
import videoTemplate from 'components/templates/video'
import overlayTemplate from 'components/templates/overlay'
import Underlay from 'components/Underlay'
import Fomo from 'components/Fomo/Fomo'
import Chat from 'components/Chat'
import EntertainmentPlus from 'components/EntertainmentPlus/EntertainmentPlus'
import CartBadge from 'components/EntertainmentPlus/CartBadge'
import UserProfile from 'components/Personalize/UserProfile'
import { AppFullscreen } from 'quasar'
/**
 * watch orientation change for mobile devices
 */
function watchOrientation () {
  if (this.$q.platform.is.mobile) {
    this.$_onOrientationChange = (ev) => {
      this.deviceScreen.orientation = ev.matches ? 'landscape' : 'portrait'
    }
    this.$_mediaQuery = window.matchMedia('(orientation: landscape)')
    if (this.$_mediaQuery.addEventListener) {
      this.$_mediaQuery.addEventListener('change', this.$_onOrientationChange)
    } else if (this.$_mediaQuery.addListener) {
      this.$_mediaQuery.addListener(this.$_onOrientationChange)
    }
    this.$_onOrientationChange(this.$_mediaQuery)
  }
}

function unwatchOrientation () {
  if (this.$_onOrientationChange) {
    if (this.$_mediaQuery.removeEventListener) {
      this.$_mediaQuery.removeEventListener('change', this.$_onOrientationChange)
    } else if (this.$_mediaQuery.removeListener) {
      this.$_mediaQuery.removeListener(this.$_onOrientationChange)
    }
  }
}

export default {
  name: 'experienceLoader',
  components: {
    vueJsonPretty,
    Underlay,
    overlayTemplate,
    videoTemplate,
    Fomo,
    Chat,
    EntertainmentPlus,
    CartBadge,
    UserProfile
  },
  debug: {
    depth: 1,
    context: 'experienceLoader'
  },
  events: {
    contentReady () {
      this.contentReady = true
    },
    toggleFullscreen () {
      this.$event.emit('setFullscreen', !AppFullscreen.isActive)
    },
    setFullscreen (enter) {
      AppFullscreen[enter ? 'request' : 'exit']().then(() => {
        this.$playerjs.receiver.emit('fullscreen', enter)
      }).catch(err => {
        console.error(err)
      })
    },
    clearActivationId () {
      this.activationId = null
    }
  },
  data () {
    return {
      // debug: this.$debug.extend('experience-loader'),
      contentReady: false,
      videoHeight: null,
      showDetails: Boolean,
      showUserProfile: false,
      showingCart: false,
      searchItem: null,
      firebaseData: null,

      // used for mobile direct access only
      deviceScreen: {
        orientation: null,
        width: null,
        height: null
      }
    }
  },
  firebase () {
    if (!this.$app.data.distribution.forStreamingSetting) return null

    return {
      firebaseData: this.$rtdb.ref(`${process.env.FIREBASE_REF}/${this.$app.session.distribution}`)
    }
  },
  mounted () {
    // Overlay content is always ready...
    if (this.$app.content.type === 'overlay') this.contentReady = true
    // this.$whisper.initialize(this.$refs['whisperDebug'])
    this.debug(`Loading content type "${this.$app.content.type}" (/components/templates/${this.$app.content.type}.vue)`)
    this.searchItem = this.getActivationItem()
    watchOrientation.call(this)
  },
  destroyed () {
    unwatchOrientation.call(this)
  },
  methods: {
    onWrapperClick (e) {
      if (this.dest !== 'underlay') return
      const evt = {
        x: e.clientX, y: e.clientY
      }
      this.$playerjs.receiver.emit('click', evt)
    },
    // TODO: This is less than ideal... We should be able to get the height of the video and have it respect the actual height
    onResize (e) {
      this.videoHeight = e.height
      if (this.isMobileDirectAccess) {
        this.deviceScreen.width = window.innerWidth
        this.deviceScreen.height = window.innerHeight
      }
    },
    mouseover (e) { this.$pulse('focusOnMedia', e) },
    mouseleave (e) { this.$pulse('focusOffMedia', e) },
    action (action) { this.$event.emit('handleAction', action) },
    // @isShowDetails='isShowDetails' on EP to reenable this when needed
    isShowDetails (v) {
      this.showDetails = !!v
    },
    showProfile (e) { this.showUserProfile = e },
    isShowingCart (e) { this.showingCart = e },
    getActivationItem () {
      // Searches within events for matching activation Id
      // TODO redirect when activation is not found
      const id = this.$route.params.activationId
      if (!id) return false
      const activation = this.$app.events.find(events => {
        if (events.id && id === `${events.id}`) return true
        else if (events.dataTypeName === 'product' && `${events.dataObject.data.externalProductId}` === id) return true
        return false
      })
      if (activation) return activation
      else {
        this.$router.push({ name: 'experience', params: { experience: this.$route.params.experience } })
        return false
      }
    }
  },
  watch: {
    '$q.screen': {
      handler () {
        this.$store.dispatch('config/layoutChange', { underlay: { height: this.underlayHeight, width: this.container.width } })
      },
      immediate: true,
      deep: true
    },
    firebaseData (val) {
      if (this.$app.data.distribution.forStreamingSetting) {
        this.debug('updated', val)
        this.$store.dispatch(
          'config/setEvents',
          this.$ee.util.get(val, 'settings.liveStatus') === 'live' ? val.data : []
        )
      }
    }
  },
  computed: {
    isFullscreen () {
      return AppFullscreen.isActive
    },
    dest () {
      if (this.isFullscreen) return 'overlay'
      if (this.$app.layout.forcedOrientation === 'portrait') return 'footer'
      if (this.$app.layout.forcedOrientation === 'landscape') return 'overlay'
      if (this.isMobileDirectAccess) {
        return this.deviceScreen.orientation === 'landscape' ? 'overlay' : 'footer'
      } else {
        if (this.underlayHeight >= this.container.height / 2) return 'footer'
        if (this.underlayHeight < this.container.height / 2) return 'overlay'
      }
      return 'overlay'
    },
    isMobileDirectAccess () {
      return this.$q.platform.is.mobile && !this.$q.platform.within.iframe
    },
    // Allows activations to take up full screen of overlay. *Disabled
    fullscreenDetails () {
      // let x
      // if (this.container.width < 900 && this.dest === 'overlay' & this.showDetails) x = 'width:100%!important'
      // else x = null
      return false // x
    },
    container () {
      // if it is mobile just return stored innerHeight & innerWidth...
      if (this.isMobileDirectAccess) {
        return {
          height: this.deviceScreen.height,
          width: this.deviceScreen.width
        }
      }
      return { height: this.$q.screen.height, width: this.$q.screen.width }
    },
    underlayHeight () {
      if (this.isMobileDirectAccess && this.dest === 'overlay') return 0
      return this.container.height - this.videoHeight
    },
    // Returns the debug time that can get overlaid on the video...
    debugTime () {
      const time = this.$app.content.currentTime
      const ms = parseInt((time % 1) * 1000).toString().padStart(3, '0')
      const totalSecs = parseInt(time)
      const secs = parseInt(time % 60).toString().padStart(2, '0')
      const mins = parseInt((time / 60) % 60).toString().padStart(2, '0')
      const hrs = parseInt(time / 3600).toString().padStart(2, '0')
      const ret = `${hrs}:${mins}:${secs}:${ms}+${totalSecs}`
      return ret
    },
    showEntertainmentPlus () {
      return true
      // const orientation = this.$q.screen.width > this.$q.screen.height ? 'landscape' : 'portrait'
      // if (this.$q.platform.is.mobile || this.dest === 'footer') return true
      // return this.$app.user.activity.level === 'active' || this.showDetails || this.showingCart
    }
  }
}
</script>
<style lang="stylus" scoped>
  .entertainment-wrapper>.entertainment__video.entertainment-overlay
    bottom 38px
    @media (min-width: 2560px)
      bottom 136px
  .play
    font-size 4em

  .media
    overflow hidden

  .entertainment-overlay
    //width: 40%
    top: 0
    right: 0
    bottom: 0
    transition: all 0.3s
    color: #fff
    z-index: 2

  .entertainment-footer
    width 100% !important
    height 100%

  .debugTime
    position absolute
    top 0
    left 0
    z-index 9999
    font-size 32px
    background black
</style>
