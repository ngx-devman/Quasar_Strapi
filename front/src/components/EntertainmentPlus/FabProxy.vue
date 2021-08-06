<template>
  <q-popup-proxy v-if="$app.content.type !=='overlay'" :v-model='value' ref='sdProxy' auto-close square :breakpoint="$q.screen.width > 2559 ? 2560 : 600" full-width target='#sd-proxyMenu' content-class='sd-proxyMenu z-max absolute' anchor="top left" self="bottom left" :offset="[10, 10]">
    <q-card dark square @mouseover="hovered(false)" @mouseleave="hovered(true)">
      <q-list dark separator>
        <!-- documentation -->
        <q-item v-if="$behavior.doesntExist('hideDocs')" clickable v-ripple @click="$emit('action', 'documentation')">
          <q-item-section avatar>
            <q-icon color="primary" name="text_snippet" />
          </q-item-section>
          <q-item-section>{{$t("documentation")}}</q-item-section>
        </q-item>
        <!-- support -->
        <q-item  v-if="$behavior.doesntExist('hideSupport')" clickable v-ripple @click="$emit('action', 'support')">
          <q-item-section avatar>
            <q-icon color="primary" name="support_agent" />
          </q-item-section>
          <q-item-section>{{$t("support")}}</q-item-section>
        </q-item>
        <!-- cart -->
        <q-item clickable v-ripple @click="$emit('triggerCart')">
          <q-item-section avatar>
            <q-icon color="primary" name="shopping_cart" />
          </q-item-section>
          <q-item-section>{{ cart.length > 0 ? `${cart.length} ${$t("items")}` : $t("cart") }}</q-item-section>
        </q-item>
        <!-- profile -->
        <q-item v-if="$app.user.id > 1" clickable v-ripple @click="$emit('action', 'profile')">
          <q-item-section avatar>
            <q-avatar v-if='$app.user.photo' rounded>
              <img :src='$app.user.photo.url'>
            </q-avatar>
            <q-icon v-else color="primary" name="person" />
          </q-item-section>
          <q-item-section>{{$t("profile")}}</q-item-section>
        </q-item>
        <!-- login -->
        <q-item v-if="$behavior.doesntExist('hidePersonalize') && $app.user.id === 1" clickable v-ripple @click="$emit('action', 'login')">
          <q-item-section avatar>
            <q-icon color="primary" name="person_add" />
          </q-item-section>
          <q-item-section>{{ $t('personalize') }}</q-item-section>
        </q-item>
        <!-- filters -->
        <q-item v-if="$behavior.doesntExist('hideFilters')" clickable v-ripple @click="$emit('action', 'filter')">
          <q-item-section avatar>
            <q-icon color="primary" name="search" />
          </q-item-section>
          <q-item-section>{{$t('pages.settings.filters.title')}}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-popup-proxy>
</template>
<script>
import { hasLocalStorage } from 'src/boot/storage'
export default {
  props: ['cart', 'value'],
  debug: { context: 'FabProxy' },
  methods: {
    chat () {
      this.$event.emit('toggleChat')
    },
    hovered (e) {
      this.$event.emit('showVideoControls', e)
      if (e) this.$refs.sdProxy.hide()
    }
  },
  data () {
    return {
      debug: this.$debug.extend('entertainment+:fab'),
      loggedIn: (hasLocalStorage() && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') ? 1 : 0,
      isFullscreen: false,
      filterDialog: false
    }
  }
}
</script>
