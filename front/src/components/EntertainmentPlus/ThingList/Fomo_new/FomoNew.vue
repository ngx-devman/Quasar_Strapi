<template>
  <div class='fomocontainer full-height q-pt-xl absolute'>
    <transition-group appear class='sdTransitions'>
      <div v-for='thing in things' :key='"fomo" + (thing.id ? thing.id : thing.dataObject.data.externalProductId)' class='q-mt-md'>
        <fomo-activation-new v-if='$behavior.exists("fomo", thing)' @detail="$emit('detail', things[index], index)" :thing='thing' :time='time'/>
      </div>
    </transition-group>
  </div>
</template>

<script>
import fomoActivationNew from './FomoActivationNew'
export default {
  props: ['things', 'time'],
  components: { fomoActivationNew },
  data () {
    return {
      loaded: false,
      skeletonWait: false,
      showIframe: false,
      link: ''
    }
  },
  methods: {
    stopViewingThing () {
      let obj = this.$app.user.activity.lookingAt.thing
      this.$playerjs.receiver.emit('activation', { id: obj.id || obj.dataObject.data.externalProductId, event: 'closed' })
      this.$store.commit('config/stopViewingThing')
      this.$event.emit('clearActivationId')
      // Disabled - not being used
      // document.getElementsByClassName('q-notifications')[0].style.display = 'block'
    }
  }
}
</script>

<style lang='stylus' scoped>
.fomocontainer
  // width 85px
  top 0
  right 0

</style>
