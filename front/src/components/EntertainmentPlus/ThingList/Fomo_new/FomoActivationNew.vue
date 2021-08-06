<template>
  <div class="flex items-center justify-end no-wrap relative-position" :style="`height: ${$q.screen.width < 2560 ? '55px' : '4vmax'}`">
    <div class="flex items-center trey-wrapper" >
      <div class="fomo-description-wrapper flex items-center " :style="`height: ${$q.screen.width < 2560 ? '45px' : '4vmax'}`">
        <div class="fomo-description text-black q-px-md ellipsis-2-lines">{{ thing.dataObject.name }}</div>
      </div>
    </div>

    <q-circular-progress
      show-value
      :value="fomoMeter"
      font-size="16px"
      center-color="grey-10"
      class="text-primary treyFomoActivation bubble-list-item-container cursor-pointer"
      :size='$q.screen.width < 2560 ? "55px" : "4vmax"'
      :thickness="0.25"
      color="primary"
      track-color="transparent"
      @click.stop="$emit('fomoCall', thing, index, thing.id || thing.dataObject.data.externalProductId)"
    >
      <q-avatar v-if='fomoImage' :size='$q.screen.width >= 2560 ? "3.3vmax" : "45px"'><img :src='fomoImage'></q-avatar>
      <q-icon v-else name="touch_app" color='white' :size='$q.screen.width >= 2560 ? "3vmax" : "40px"'/>
      <q-btn @click="$emit('detail', index)" class="absolute-top close-btn" size="6px" round color="black" icon="close" />
    </q-circular-progress>
  </div>
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
      return (timeLeft / totalTime) * 51
    },
    // The image to draw if there is only one...
    fomoImage () {
      let img = this.getThingImage(this.thing)
      if (img) return img
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
.treyFomoActivation {
  position: absolute;
}

.treyFomoActivation:after {
  content: '';
  position: absolute;
  transform: translateX(-10%);
  display: block;
  right: -2px;
  width: 28px;
  top: 0;
  height: 100%;
  border-style: solid;
  border-color: #B8D8E6;
  border-width: 5px 5px 5px 0;
  border-radius: 0 115px 115px 0;
  z-index: -1;
}

.q-avatar {
  z-index: 2;
}

/deep/.treyFomoActivation .q-circular-progress__text .q-avatar__content {
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
}
.close-btn {
  margin: 0 auto;
  transform: translateY(-50%);
  z-index 3
}

.fomo-description-wrapper {
  width: 100%;
  margin-left: 3px;
  border-radius: 50px;
  background-color: #FDE5D2;
  padding-right: 35px;
}

.fomo-description-wrapper:after {
  content: '';
  position: absolute;
  transform: translateX(-10%);
  display: block;
  left: 3px;
  width: 30px;
  height: 100%;
  border-style: solid;
  border-color: #f68720;
  border-width: 5px 0 5px 5px;
  border-radius: 115px 0 0 115px;
  z-index 2
}

.trey-wrapper {
  border-radius: 50px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: width 0.5s ease-in-out;
  position: relative;
  right: 10px

  .fomo-description {
    line-height: 1.3;
    overflow: hidden;
    max-width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

@media only screen and (max-width: 1100px) {
  .trey-wrapper .fomo-description {
    white-space: unset;
  }
}

@media only screen and (max-width: 670px) {
  .trey-wrapper {
    width: auto;
  }

  .treyFomoActivation:after {
    z-index: 0;
  }

  /deep/.treyFomoActivation .q-circular-progress__svg {
    z-index: 2;
    position: relative;
  }
}

</style>
