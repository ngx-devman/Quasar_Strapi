<template>
  <div style="width: 100%;height:100%">
    <div v-for="(thing, index) in things" :key="index" style="width: 100%;height:100%">
      <div v-if="thing.action === 'link'" class="hiddenBase" :style="hiddenStyle(index)" @click.prevent.stop="handleClick(index)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['things'],
  methods: {
    handleClick (index) {
      const url = this.things[index].payload.url
      this.$pulse('invisible', this.things[index])
      this.$pulse('visited', { url })
      window.open(url, this.things[index].payload.target || '_blank')
    },
    // Produces the hidden style for an invisible event...
    hiddenStyle (index) {
      return {
        height: `calc(${this.things[index].payload.height || 100}% - 40px)`,
        width: `${this.things[index].payload.width || 100}%`,
        top: `${this.things[index].payload.top || 0}%`,
        left: `${this.things[index].payload.left || 0}%`,
        border: this.things[index].payload.debug ? '10px solid red' : 'none'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .hiddenBase
    position absolute
    z-index 9999
    width 100%
    height 100%
</style>
