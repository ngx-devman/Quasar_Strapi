<template>
  <div
    class="full-width q-pa-md overflow-hidden column"
    :class="{
      'sdThingDetails': !$app.user.activity.lookingAt.iframe,
      'sdThingDetails__overlay': list === 'overlay'
    }"
    :style="[ overlayStyle, {
      height: $app.content.type === 'overlay' && $q.platform.within.iframe ? '100vh!important': '100%!important'
    }]"
  >
    <div class="row q-mb-sm">
      <!-- close button -->
      <div>
        <q-btn @click.stop="$emit('cancel', thing)" round :color="buttonConfig.close.color" icon="close"/>
      </div>
      <q-space />
      <!-- share button -->
      <div v-if="thing.meta && thing.meta.social">
        <q-btn :icon="shareMenuOpen ? 'highlight_off' : 'ios_share'" round flat>
          <q-menu anchor="top right" content-class="sd-sharing-menu bg-transparent" v-model="shareMenuOpen">
           <q-card class="bg-black full-width row justify-end q-py-sm q-pr-sm q-gutter-sm">
              <template
                v-for="(item, index) in thing.meta.social"
              >
                <q-btn
                  :key="item.network + '_' + index"
                  v-if="item.network === 'clipboard'"
                  color="black"
                  round
                  icon="fas fa-link"
                  class="copy-link-btn"
                  @click="copyLinkToClipboard"
                />
                <ShareNetwork
                  :key="item.network + '_' + index"
                  v-else
                  :network="item.network"
                  :title="thing.meta.display"
                  :url="url"
                  tag="div"
                >
                <!-- Invert monochrome color -->
                  <q-btn size="md"
                    round
                    :icon="item.icon"
                    class="share-button"
                    @click="handleAnalytics(item)"
                    :style="item.color === 'white' && item.textcolor === 'black' ?
                      {backgroundColor: 'black', color: 'white'} :
                      {backgroundColor: item.brandcolor, color: item.textcolor }"
                  />
                </ShareNetwork>
              </template>
           </q-card>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div class="fit scroll col relative-position" dark :visible="false">
      <!-- The thing detail (animation, scroll area, and strategy loader) -->
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <component v-show="loaded" :class="[isSmartBlockList && 'absolute-full']" :is="thingComponent" :thing="thing" :height="height" @showCart="$emit('showCart')" @loaded="loaded = true" @linkDialog='openLinkDialog' />
      </transition>
      <!-- Render a skeleton thing if 300ms passes and it hasn't loaded yet -->
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-show="!loaded && skeletonWait" class="fit" dark :visible="false">
          <q-skeleton class="bg-grey" height="210px" />
          <q-skeleton type="text" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" class="text-caption" />
        </div>
      </transition>
    </div>
    <!-- Open Links Iframe -->
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
     <div class='fit absolute' style='top:0;right:0;' v-show="$app.user.activity.lookingAt.iframe">
      <q-card class='fit'>
        <q-btn  style='z-index:11;' @click="closeIframe" round color="black" icon="close" :style="cancelButtonConfig"/>
        <iframe class='fit' id='sdIframeDisplay' frameBorder="0" style='z-index:10;' target="_parent" :src='$app.user.activity.lookingAt.iframe'/>
      </q-card>
    </div>
    </transition>
  </div>
</template>

<script>
import defaultThing from 'components/EntertainmentPlus/things/default'
import productThing from 'components/EntertainmentPlus/things/product'
import productV2Thing from 'components/EntertainmentPlus/things/productV2'
import brandThing from 'components/EntertainmentPlus/things/brand'
import iframeThing from 'components/EntertainmentPlus/things/iframe'
import samInuvoThing from 'components/EntertainmentPlus/things/samInuvo'
import albumThing from 'components/EntertainmentPlus/things/album'
import appThing from 'components/EntertainmentPlus/things/app'
import SmartBlockList from 'components/EntertainmentPlus/things/SmartBlockList'
import merge from 'lodash/merge'
import { copyToClipboard } from 'quasar'
export default {
  props: {
    thing: {},
    list: {},
    height: Number
  },
  components: {
    defaultThing,
    productThing,
    albumThing,
    brandThing,
    productV2Thing,
    appThing,
    SmartBlockList,
    iframeThing,
    samInuvoThing
  },
  data () {
    return {
      loaded: false,
      skeletonWait: false,
      showIframe: false,
      link: '',
      shareMenuOpen: false,
      url: ''
    }
  },
  mounted () {
    setTimeout(() => { this.skeletonWait = true }, 300)
  },
  watch: {
    $route: {
      handler () {
        this.url = window.location.origin + window.location.pathname
      },
      immediate: true
    }
  },
  computed: {
    thingType () {
      if (this.thing['@type']) return this.thing['@type']
      else if (this.thing.dataTypeName === 'product' && this.thing.mapped) return 'productV2'
      else if (this.thing.dataTypeName === 'product' && !this.thing.mapped) return 'product'
      else if (this.thing.dataTypeName) return this.thing.dataTypeName
      return 'default'
    },
    buttonConfig () {
      const config = this.$behavior.get('btnConfig')
      const defaults = {
        share: { color: 'black', textColor: 'white', direction: 'left' },
        close: { color: 'black' }
      }
      return merge(defaults, config)
    },
    cancelButtonConfig () {
      const styles = this.$behavior.get('closeBtnPosition')
      const defaultConfig = {
        margin: '24px 24px',
        position: 'absolute',
        zIndex: 999
      }
      if (styles) return { ...defaultConfig, ...styles }
      return {
        ...defaultConfig,
        top: 0,
        right: 0
      }
    },
    isSmartBlockList () {
      return this.thing.version && this.thing.version >= 2
    },
    thingComponent () {
      if (this.isSmartBlockList) return 'smart-block-list'
      return this.thingType + '-thing'
    },
    overlayStyle () {
      if (this.list === 'overlay') {
        return {
          minWidth: this.$app.settings.layout.activations.details.minWidth,
          maxWidth: this.$app.settings.layout.activations.details.maxWidth
        }
      }
      return ''
    }
  },
  methods: {
    openLinkDialog (link) {
      this.$store.commit('config/viewIframe', link)
    },
    closeIframe () {
      this.$store.commit('config/stopViewingIframe')
    },
    copyLinkToClipboard () {
      copyToClipboard(`${this.url}`).then(() => {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Link Copied!'
        })
      })
    },
    handleAnalytics (item) {
      const body = {
        type: 'action',
        event: 32,
        e: 32,
        sess: `${this.$config.app.session.id}`,
        payload: {
          type: 'share',
          network: item.network,
          item
        }
      }
      this.$common.timeline.internalAnalytics(body)
    }
  }
}
</script>
<style lang="stylus">
// The wrapper for all things details
.sdThingDetails
  background rgba(0, 0, 0, 0.80)
#sdIframeDisplay body
  overflow-x scroll
.sd-sharing-menu
  min-width 0
  max-width: 210px;
</style>
