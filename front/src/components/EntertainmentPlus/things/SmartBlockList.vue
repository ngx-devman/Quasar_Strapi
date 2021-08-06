
<template>
  <div class="smart-block-list" :class="{'smart-block-list---preview': preview}">
    <template v-for="(block, index) in smartBlocks">
      <component
        ref="block"
        class="smart-block-list__item"
        :is="block.component"
        :class="{'q-mt-md': index !== 0 }"
        :key="block.data.id"
        :settings="block.data.settings"
        :context="_context"
        @action="onAction"
        @listen="onListen(block, $event)"
        @call-event="processSmartBlockEvent"
        />
    </template>
    <q-scroll-observer @scroll="onScroll"/>
  </div>
</template>

<script>
import { debounce, uid } from 'quasar'
import externalComponent from 'src/utils/external-component'
import capitalize from 'lodash/capitalize'
import smartblockEvents from 'src/utils/smartblock-events'

const toArray = (item) => {
  if (!item) return []
  if (Array.isArray(item)) return item
  return [item]
}
export default {
  props: {
    thing: Object,
    context: Object,
    preview: Boolean
  },
  debug: {
    context: 'SmartBlockList'
  },
  created () {
    this.$emit('loaded')
    this.libBaseUrl = process.env.SOURCE_SMARTBLOCK_BASE || 'https://cdn.sourcesync.io/smartblocks'
    // NOTE: because of playerjs(iframe listener), we cannot maintain this converted list reactively.
    // if the list needs to be updated dynamically, make sure to implment code to cleanup listening playerjs instances.
    this.smartBlocks = this.thing.template.map(item => this.convertSmartBlock(item))
  },
  data () {
    return {
      smartBlocks: []
    }
  },
  methods: {
    onListen (block, { el }) {
      this.debug('Register playerjs...', block, el)
      this.$playerjs.sender.register(block.$_playerjs_id, el)
    },
    onAction (payload) {
      this.$analytics(this.$common.constants.events.action, this.thing.id)
      this.$pulse('activationAction', { id: this.thing.id, payload })
      this.$playerjs.receiver.emit('action', { activationId: this.thing.id, data: payload })
    },
    onScroll: debounce(function (data) {
      this.$playerjs.receiver.emit('activationScroll', data)
    }, 500),

    convertSmartBlock (data) {
      const moduleName = `${data.moduleName || 'source-digital~SmartBlock' + capitalize(data.name)}@${data.moduleVersion || process.env.SMARTBLOCK_DEFAULT_VERSION}`
      const componentUrl = `${this.libBaseUrl}/${moduleName}.umd.min.js`
      return {
        $_playerjs_id: uid(),
        data,
        component: () => externalComponent(componentUrl, moduleName)
          .catch(e => { console.error('Error occurred while loading external component.', data, e); return null })
      }
    },
    processSmartBlockEvent (evt = {}) {
      const fn = smartblockEvents[evt.event]
      if (!fn) {
        // if this component is used in preview, then propagate event
        if (this.preview) {
          this.$emit('call-event', evt)
        } else console.error('Unknown smartblock event.', evt)
        return
      }
      fn.call(this, evt.payload)
    }
  },
  computed: {
    _context () {
      return {
        api: { base: process.env.API_BASE },
        ...(this.context || {})
      }
    }
  },
  beforeDestroy () {
    toArray(this.smartBlocks).forEach(block => {
      this.$playerjs.sender.unregister(block.$_playerjs_id)
    })
  }
}
</script>

<style lang="stylus">
.smart-block-list {
  &---preview {
    .smart-block-list__item {
      animation-delay: 0.3s
    }
  }
}
</style>
