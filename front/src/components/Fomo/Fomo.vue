<template>
  <div class='fomocontainer full-height q-pt-xl absolute'>
    <transition-group name='sdEase' appear class='sdTransitions'>
      <div v-for='thing in things' :key='"fomo" + (thing.id ? thing.id : thing.dataObject.data.externalProductId)' class='q-mt-md'>
        <fomo-activation v-if='$behavior.exists("fomo", thing)' :thing='thing' :time='time'/>
      </div>
    </transition-group>
  </div>
</template>

<script>
import fomoActivation from './FomoActivation'
export default {
  props: ['things', 'time'],
  components: { fomoActivation }
}
</script>

<style lang='stylus' scoped>
.fomocontainer
  // width 85px
  top 0
  right 0
</style>
