<template>
    <div v-if="$behavior.exists('fab')" class="absolute-bottom-right q-mr-md column no-wrap index-2 fab-wrapper" style="z-index: 999">
      <q-fab
       :icon="cartQty > 0 ? 'shopping_cart' : 'touch_app'"
       :direction="$q.platform.is.mobile ? 'left' : 'up'"
       vertical-actions-align="right"
       :label="cartQty > 0 ? cartQty : ''"
       label-position="top"
       external-label
       label-class="fab-badge"
       label-style="background-color: #f44336"
       hide-label="false"
       color="primary">
        <!-- documentation -->
        <q-fab-action v-if="$behavior.doesntExist('hideDocs')" color="primary" icon="text_snippet" @click="$emit('action', 'documentation')">
          <p class="bubble-list-item-text q-mb-none q-mr-md text-body1 text-no-wrap" v-if='$q.platform.is.desktop'>{{ $t('documentation') }}</p>
        </q-fab-action>
        <!-- support -->
        <q-fab-action v-if="$behavior.doesntExist('hideSupport')" color="primary" icon="support_agent" @click="$emit('action', 'support')">
          <p class="bubble-list-item-text q-mb-none q-mr-md text-body1 text-no-wrap" v-if='$q.platform.is.desktop'>{{ $t('support') }}</p>
        </q-fab-action>
        <!-- cart -->
        <q-fab-action label-position="right" color="primary" icon="shopping_cart" @click="$emit('action', 'cart')">
          <p class="bubble-list-item-text q-mb-none q-mr-md text-body1 text-no-wrap" v-if='$q.platform.is.desktop'>
            {{ cart.length > 0 ? `${cart.length} ${$t("items")}` : $t("fab.cart") }}
          </p>
        </q-fab-action>
        <!-- chat -->
      <!--  <q-fab-action label-position="right" color="primary" icon="chat" @click="chat">
          <p class="bubble-list-item-text q-mb-none q-mr-md text-body1 text-no-wrap" v-if='$q.platform.is.desktop'>
            Chat
          </p>
        </q-fab-action> -->
        <!-- profile -->
        <q-fab-action v-if="$app.user.id > 1" color="primary" :icon="$app.user.photo ? 'img:' + $app.user.photo.url : 'fas fa-user'" @click="$emit('action', 'profile')">
          <p class="bubble-list-item-text q-mb-none q-mr-md text-body1 text-no-wrap" v-if='$q.platform.is.desktop'>{{$t("fab.account")}}</p>
        </q-fab-action>
        <!-- login -->
        <q-fab-action v-if="$behavior.doesntExist('hidePersonalize') && $app.user.id === 1" color="primary" icon="person_add" @click="$emit('action', 'login')">
          <p class="bubble-list-item-text q-mb-none q-mr-md text-body1 text-no-wrap" v-if='$q.platform.is.desktop'>{{ $t('fab.login') }}</p>
        </q-fab-action>
        <!-- filters -->
        <q-fab-action v-if="$behavior.doesntExist('hideFilters')" color="primary" icon="search" @click="$emit('action', 'filter')">
          <p class="bubble-list-item-text q-mb-none q-mr-md text-body1 text-no-wrap" v-if='$q.platform.is.desktop'>{{$t('fab.filter')}}</p>
        </q-fab-action>
      </q-fab>
    </div>
</template>
<script>
import { hasLocalStorage } from 'src/boot/storage'
export default {
  props: ['cart'],
  methods: {
    chat () {
      this.$event.emit('toggleChat')
    }
  },
  data () {
    return {
      debug: this.$debug.extend('entertainment+:fab'),
      loggedIn: (hasLocalStorage() && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') ? 1 : 0,
      isFullscreen: false,
      filterDialog: false
    }
  },
  computed: {
    cartQty () {
      let quantity = 0
      this.$app.user.cart.forEach(product => {
        quantity += product.quantity
      })
      return quantity
    }
  }
}
</script>
<style lang="stylus">
.bubble-list-item-text
  background-color rgba(0, 0, 0, 0.5)
  color white
  padding 0.5rem
  border-radius 0.125rem
  height fit-content
  margin-top 0.25em
  text-align right
.fab-wrapper
  margin-bottom 45px
  .bubble-list-item-text
    position absolute
    right 100%
.padding-none .q-dialog__inner--left
  padding-top 0
.fab-badge
    top: 15px;
    left: 85%;
    font-size: 12px;

@media (min-width: 1700px)
 .fab-wrapper
  margin-bottom: 40px;
// *Re-enable when needed
@media (min-width: 2560px)
  .fab-wrapper
    margin-bottom 11em
    margin-right 1.6em
  .q-fab
    height 4vmax
    width 4vmax
  .q-fab--form-rounded
    border-radius 100%!important
  .q-btn--fab .q-icon
    font-size 1.9vmax
    width 0px
  .q-btn--fab-mini .q-icon
    font-size 1.3vmax
  .q-btn--fab-mini .q-btn__wrapper
    min-width 2.5vmax
    min-height 2.5vmax
  div.q-btn__wrapper.col.row.q-anchor--skip > div > p
    font-size 2rem!important
@media (max-width: 1334px) and (orientation: portrait)
  .fab-wrapper
    bottom 51px

  .isFullscreen .fab-wrapper
    bottom 0

@media (max-width: 667px) and (orientation: portrait)
  .isFullscreen .fab-wrapper
    bottom 51px

@media all and (max-width: 640px)
  .mobile-full-dialog .q-dialog__inner--minimized
    padding: 0

@media (max-width: 600px) and (orientation: portrait)
  .fab-wrapper
    bottom 10px
</style>
