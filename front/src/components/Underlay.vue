<template>
  <div class="fit" style="color: white">
    <entertainment-plus class='orientation-portrait' v-show="showEntertainmentPlus" :things="$app.session.visibleEvents" list='underlay' />
    <thing-details v-if="showDetails" :thing="$app.user.activity.lookingAt.thing" @cancel="stopViewingThing" @showCart="triggerCart" />
    <cart v-else-if="showCart" class="transition" @close="showCart = false" @closeAll="showCart = false" />
  </div>
</template>

<script>
import EntertainmentPlus from 'components/EntertainmentPlus/EntertainmentPlus'
import ThingDetails from 'components/EntertainmentPlus/ThingDetails'
import Cart from 'components/ShoppingCart/ShoppingCart'

export default {
  props: ['things'],
  components: { ThingDetails, EntertainmentPlus, Cart },
  data () {
    return {
      showCart: false
    }
  },
  methods: {
    triggerCart () {
      this.stopViewingThing()
      this.showCart = true
    },
    // View a thing...
    viewThing (e) {
      this.$store.commit('config/viewThing', e)
    },
    // Stop viewing a thing...
    stopViewingThing () {
      this.$store.commit('config/stopViewingThing')
    }
  },
  computed: {
    showDetails () {
      return this.$q.screen.lt.md && this.$app.user.activity.lookingAt.thing
    },
    showEntertainmentPlus () {
      return !this.$app.user.activity.lookingAt.thing && this.$q.screen.lt.sm && !this.showCart
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
