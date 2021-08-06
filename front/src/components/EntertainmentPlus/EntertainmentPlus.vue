<template>
  <div class="absolute no-pointer-events">
    <debug/>
    <div @click.stop='debug("CLICKED EP")' v-show="!show.settings" class='full-width sdListTransitions' :style='list === "footer" ? "height:"+$app.layout.underlay.height+"px":"height:100%"'>
      <!-- Shopping cart -->
      <transition appear name='sdSlideZoom'>
        <cart v-if="showCart" class="transition all-pointer-events" @close="closeCart" @closeAll="closeCart" />
      </transition>
      <!-- Thing details -->
      <transition name='sdSlideZoom'>
        <thing-details :style="rightPosition && {right: 0}" class='absolute all-pointer-events' v-if="showDetails" :list='list' :thing="$app.user.activity.lookingAt.thing" :height="videoHeight" @cancel="stopViewingThing" @showCart="triggerCart" />
      </transition>
      <!-- Thing list -->
      <transition appear name='sdSlideZoom'>
        <thing-list v-show="!showDetails && !showCart" :things="things" @detail="viewThing" :type="list"/>
      </transition>
      <!-- The Floating Action Button (FAB) -->
      <fab class='all-pointer-events' v-if="!showCart && !showDetails" @action='handleFabAction' :cart="cart" />
    </div>
    <!-- The login dialog -->
    <q-dialog v-model="show.login" class='all-pointer-events'>
      <Login @setAction='setAction' :regStatus="regStatus"/>
    </q-dialog>
    <!-- The register dialog -->
    <q-dialog v-model="show.register" class='all-pointer-events'>
      <Register @setAction='setAction' @registration='processStatus'/>
    </q-dialog>

    <!-- User Profile Dialog -->
    <!-- <user-profile v-model="show.userProfile" @action="handleFabAction" :user='$app.user'/> -->
    <!-- filter dialog -->
    <filters-dialog v-model="show.filterDialog" class='all-pointer-events'/>
    <!-- Proxy -->
    <fab-proxy v-if="$behavior.doesntExist('fab')" class='all-pointer-events' v-model='show.proxy' @action='handleFabAction' @triggerCart='triggerCart' :cart="cart" />
  </div>
</template>

<script>
import Cart from 'components/ShoppingCart/ShoppingCart'
import Fab from './fab'
import FabProxy from './FabProxy'
import ThingList from './ThingList'
import ThingDetails from './ThingDetails'
import Login from 'components/Personalize/Login'
import Register from 'components/Personalize/Register'
// import UserProfile from 'components/Personalize/UserProfile'
import FiltersDialog from 'components/FiltersDialog/FiltersDialog'
import { hasLocalStorage } from 'src/boot/storage'
export default {
  name: 'entertainmentPlus',
  debug: {
    depth: 3,
    context: 'entertainmentPlus'
  },
  props: {
    things: {},
    list: {},
    searchItem: {},
    videoHeight: Number
  },
  components: { Cart, ThingList, ThingDetails, Login, Register, FiltersDialog, FabProxy, Fab },
  data () {
    return {
      show: {
        dialog: false, // Showing any dialog
        cart: false,
        details: false,
        login: false,
        register: false,
        userProfile: false,
        filterDialog: false,
        proxy: false
      },
      viewDetails: false,
      viewing: false,
      hasToken: (hasLocalStorage() && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') ? 1 : 0,
      token: hasLocalStorage() ? localStorage.getItem('token') : '',
      loginId: hasLocalStorage() ? localStorage.getItem('loginId') : '',
      login: false,
      mouseMove: false,
      cart: [],
      showItem: false,
      visibleItems: [],
      displayedItemIds: [],
      displayedItemsCount: 0,
      currentTimeMs: 0,
      showPersonalize: false,
      regStatus: ''
    }
  },
  watch: {
    showDetails (v) {
      this.show.details = v
      // Feature: playThroughDetails behavior continues media playback even if thing details is shown...
      if (this.$behavior.doesntExist('playThroughDetails', v)) {
        // Feature: Showing thing details pauses media playback...
        if (v) {
          if (this.$common.media.ref.playing) {
            this.wasPlaying = true
            this.$common.media.ref.pause()
          }
        // Feature: Hiding thing details resumes media playback...
        } else {
          if (this.wasPlaying === true) {
            this.wasPlaying = false
            this.$common.media.ref.play()
          }
        }
      }
    },
    'searchItem' (v) {
      this.debug(this.$app.user.activity.lookingAt.thing, 'Thing')
      this.$store.commit('config/setThing', v)
    }
  },
  computed: {
    // When to show events...
    showEvents () {
      return !this.show.details && !this.show.cart
    },
    showCart () {
      if (this.show.cart === false) return false
      if (!this.show.details && this.show.cart) return true
      return false
    },
    // Show details here if the screen size is > small or the underlay is not visible, and they are looking at something...
    showDetails () {
      this.$emit('isShowDetails', this.$app.user.activity.lookingAt.thing)
      return this.$app.user.activity.lookingAt.thing
    },
    lookingAtSomething () {
      return !!this.$app.user.activity.lookingAt.thing
    },
    rightPosition () {
      return !this.$app.user.activity.lookingAt.thing.position || this.$app.user.activity.lookingAt.thing.position === 'right'
    }
  },
  events: {
    toggleProxy () {
      this.show.proxy = true
    },
    async handleAction (action) {
      await this.handleFabAction(action)
    }
  },
  methods: {
    handleFabAction (action) {
      // Pause the video while we complete this action...
      this.$common.media.ref.pause()
      switch (action) {
        case 'login':
          this.show.login = true
          break
        case 'register':
          this.show.register = true
          break
        case 'logout':
          this.userLogout()
          break
        case 'cart':
          this.show.cart = true
          this.$emit('isShowingCart', true)
          break
        case 'profile':
          // this.show.userProfile = true
          this.$emit('showProfile', true)
          break
        case 'filter':
          this.show.filterDialog = true
          break
        case 'support':
          this.$zendesk.show()
          this.$zendesk.open()
          break
        case 'documentation':
          window.open('https://docs.sourcedigital.net/', '_blank')
      }
    },
    userLogin () {
      this.login = true
    },
    userLogout () {
      if (!hasLocalStorage()) return false
      localStorage.removeItem('token')
      // this.show.userProfile = false
      this.$user.logout()
      this.$emit('showProfile', false)
      this.$store.dispatch('config/logout')
    },
    setAction (action) {
      switch (action) {
        case 'login':
          this.handleFabAction('login')
          break
        case 'register':
          this.handleFabAction('register')
          break
      }
    },
    processStatus (action) {
      this.show.login = true
      this.regStatus = action
      this.show.register = false
    },
    triggerCart () {
      if (this.$app.user.activity.lookingAt.thing) this.stopViewingThing()
      this.show.cart = true
    },
    // View a thing...
    viewThing (e) {
      this.$analytics(this.$common.constants.events.interact, e.id)
      this.$playerjs.receiver.emit('activation', { id: e.id || e.dataObject.data.externalProductId, event: 'clicked' })
      this.$store.commit('config/viewThing', e)
      // Disabled - not being used
      // document.getElementsByClassName('q-notifications')[0].style.display = 'none'
    },
    // Stop viewing a thing...
    stopViewingThing () {
      let obj = this.$app.user.activity.lookingAt.thing
      this.$playerjs.receiver.emit('activation', { id: obj.id || obj.dataObject.data.externalProductId, event: 'closed' })
      this.$store.commit('config/stopViewingThing')
      this.$event.emit('clearActivationId')
      // Disabled - not being used
      // document.getElementsByClassName('q-notifications')[0].style.display = 'block'
    },
    /*
    clearCartData () {
      this.debug('in clearCartData')
      this.cart = []
    },
    */
    closeCart () {
      this.show.cart = false
      this.$emit('isShowingCart', false)
    }
  },
  mounted () {
    if (this.searchItem) {
      this.$store.commit('config/setThing', this.searchItem)
    }
    if (this.$common.get(this.$app.user, 'settings.language.value')) {
      // this.$i18n.locale = this.showLocale.language.value
    }
  }
}
</script>
