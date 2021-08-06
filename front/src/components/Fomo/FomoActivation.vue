<template>
  <q-circular-progress
    show-value
    :value="fomoMeter"
    font-size="16px"
    center-color="grey-10"
    class="text-primary fomoActivation bubble-list-item-container cursor-pointer"
    :size='$q.screen.width < 2560 ? "55px" : "4vmax"'
    :thickness="0.25"
    color="primary"
    track-color="grey-3"
    @click.stop="$emit('fomoCall', thing, index, thing.id || thing.dataObject.data.externalProductId)"
  >
    <q-avatar v-if='fomoImage' :size='$q.screen.width >= 2560 ? "3.3vmax" : "45px"'><img :src='fomoImage'></q-avatar>
    <q-icon v-else name="touch_app" color='white' :size='$q.screen.width >= 2560 ? "3vmax" : "45px"'/>
  </q-circular-progress>
</template>

<script>
export default {
  props: ['thing', 'time', 'index'],
  debug: {
    context: 'fomoActivation'
  },
  destroyed () {
    this.$emit('activationId', this.thing.id || this.thing.dataObject.data.externalProductId)
  },
  methods: {
    getThingImage (thing) {
      if (thing.schema) return thing.image
      return thing.dataObject.mainImageUrl
    },
    getThingDisplayTimeLeft (thing, time) {
      if (thing.schema) return thing.end - time
      else {
        let timeMs = time * 1000
        let timeLeftMs = thing.endTimeMs - timeMs
        return timeLeftMs / 1000
      }
    },
    getThingDisplayTime (thing) {
      if (thing.schema) return thing.end - thing.start
      return (thing.endTimeMs - thing.startTimeMs) / 1000
    }
  },
  computed: {
    // The amount left in the fomo meter (0-100)...
    fomoMeter () {
      const timeLeft = this.getThingDisplayTimeLeft(this.thing, this.time)
      const totalTime = this.getThingDisplayTime(this.thing)
      return (timeLeft / totalTime) * 100
      // Old functionality, keeping just in case needed
      //
      // Don't calculate anything if there are no things...
      // if (this.fomoCount < 1) return
      // if (this.fomoCount === 1) {
      // Calculate a single thing...
      // const timeLeft = this.getThingDisplayTimeLeft(this.things[0], this.time)
      // const totalTime = this.getThingDisplayTime(this.things[0])
      // return (timeLeft / totalTime) * 100
      // } else {
      //   // Calculate multiple things...
      //   return 100
      // }
    },
    // The image to draw if there is only one...
    fomoImage () {
      // return this.things.length > 0 ? this.getThingImage(this.things[0]) : ''
      let img = this.getThingImage(this.thing)
      if (img) return img
      return false
    }
  }
}
</script>
