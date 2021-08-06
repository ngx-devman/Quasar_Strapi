<template>
   <SmartBlockList
      class="full-width smart-block-preview"
      :thing="_thing"
      :context="context"
      preview
      @call-event="processPreviewEvent"
    />
</template>

<script>
import SmartBlockList from 'components/EntertainmentPlus/things/SmartBlockList'
import get from 'lodash/get'
import merge from 'lodash/merge'
export default {
  name: 'SmartBlockPreview',
  components: {
    SmartBlockList
  },
  computed: {
    seen () {
      return this.seenIds.has(this.thing.id)
    },
    _thing () {
      const baseSettings = {
        label: {
          text: get(this.thing, 'meta.display')
        },
        image: {
          src: get(this.thing, 'meta.icon')
        }
      }
      return {
        id: this.thing.id,
        template: this.thing.meta.preview.template.map(t => {
          return {
            ...t,
            settings: merge(baseSettings, t.settings)
          }
        })
      }
    },
    timeRemaining () {
      return this.thing.endTimeMs - (this.$app.content.currentTime * 1000)
    },
    context () {
      return {
        currentTime: this.$app.content.currentTime,
        portrait: this.portrait, // true if metacontent preview is rendered in portrait mode
        duration: this.thing.duration,
        timeRemaining: this.timeRemaining,
        left: this.leftIcon,
        seen: this.seen
      }
    }
  },
  methods: {
    processPreviewEvent (ev) {
      // TODO fix event names
      switch (ev.event) {
        case 'openDetails': {
          this.$emit('fomoCall')
          break
        }
        case 'seen': {
          this.$emit('activationId')
          break
        }
        default: {
          console.error('Unknown Event.', ev)
        }
      }
    }
  },
  props: {
    thing: Object,
    leftIcon: Boolean,
    portrait: Boolean,
    seenIds: Set
  }
}
</script>
