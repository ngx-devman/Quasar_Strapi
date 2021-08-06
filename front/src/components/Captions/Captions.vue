<template>
  <div class="transparent-container absolute">
    {{currentCaption}}
    {{time}}
    <div v-for="(caption, index) in captionList" :key="index" :class="{ active: index === currentCaption }">
      {{index}} {{toHumanTime(caption.startTime)}} - {{toHumanTime(caption.endTime)}} : {{caption.text}}
    </div>
  </div>
</template>

<script>
import VTTParser from './parser.js'
export default {
  props: ['captions', 'time'],
  computed: {
    // Returns the current caption index based on time prop passed to this component...
    currentCaption () {
      let index = 0
      let currentIndex = false
      this.captionList.forEach(caption => {
        if (this.time >= caption.startTime && this.time <= caption.endTime) currentIndex = index
        index++
      })
      return currentIndex
    }
  },
  data () {
    return {
      captionList: []
    }
  },
  methods: {
    toHumanTime (ms) {
      let seconds = parseInt(ms)
      let minutes = parseInt(seconds / 60)
      let hours = parseInt(minutes / 60)
      let result = ''
      seconds = seconds % 60
      minutes = minutes % 60
      if (hours > 0) result += `${hours}h `
      if (minutes > 0) result += `${minutes}m `
      if (seconds > 0) result += `${seconds}s `
      return result
    }
  },
  mounted () {
    // this.captionList = parser(this.captions)
    if (this.captions) this.captionList = VTTParser(this.captions)
  },
  watch: {
    captions (newCaptions) {
      this.captionList = VTTParser(newCaptions)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .active {
    font-weight: 700
  }
</style>
