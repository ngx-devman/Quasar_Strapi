<template>
  <component
    :is="template"
    :thing="thing"
    :index="index" @detail="phone ? openDial() : $emit('detail', thing)"
    :left-icon="leftIcon"
    @activationId='$emit("activationId", thing.id)'
    @fomoCall="fomoCall"
    :seen-ids="seenIds"
    :portrait="type === 'footer'"/>
</template>

<script>
import BubbleItem from './ThingList/bubble'
import BubbleV2Item from './ThingList/BubbleV2'
import RigidV2Item from './ThingList/RigidV2'
import RigidItem from './ThingList/rigid'
import fomoActivation from 'components/Fomo/FomoActivation'
import fomoActivationNew from './ThingList/Fomo_new/FomoActivationNew'
import Analytics from 'components/common/Analytics.js'
import SmartBlockPreview from './ThingList/SmartBlockPreview'
import get from 'lodash/get'

export default {
  props: {
    thing: Object,
    leftIcon: Boolean,
    type: String,
    index: Number,
    seenIds: Set
  },
  components: {
    BubbleItem,
    BubbleV2Item,
    RigidItem,
    RigidV2Item,
    fomoActivation,
    fomoActivationNew,
    Analytics,
    SmartBlockPreview
  },
  mounted () {
    // fixme
    this.$analytics(this.$common.constants.events.view, this.thing.id)
    this.$pulse('activationDisplay', this.thing.id)
  },
  computed: {
    isSmartBlockPreview () {
      const template = get(this.thing, 'meta.data.settings.preview.template')
      return template && Array.isArray(template) && template.length > 0
    },
    template () {
      if (this.isSmartBlockPreview) return SmartBlockPreview
      const template = this.$app.settings.layout.things.lists[this.type].template
      return `${template}${this.thing.version && this.thing.version >= 2 ? '-v2' : ''}-item`
    },
    phone () {
      return get(this.thing, 'meta.phone')
    }
  },
  methods: {
    openDial () {
      const phone = `${this.phone.countryCallingCode}${this.phone.phoneNumber}`
      this.$analytics(this.$common.constants.events.action, this.thing.id)
      this.$pulse('activationAction', { id: this.thing.id, phone })
      window.open(`tel:${phone}`, '_self')
    },
    fomoCall () {
      this.$emit('fomoCall', this.thing, this.index, this.thing.id)
    }
  }
}
</script>

<style>

</style>
