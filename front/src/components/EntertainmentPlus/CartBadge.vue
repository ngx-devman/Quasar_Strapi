<template>
<mounting-portal v-if="contentReady && $behavior.doesntExist('fab') && $app.content.type !== 'overlay'" mountTo="#sd-proxyMenu" class="absolute" append>
  <div v-if='cartQty > 0'>
    <q-badge color="red" floating class='flex-center'>
      {{cartQty}}
    </q-badge>
  </div>
</mounting-portal>
</template>

<script>
export default {
  props: ['contentReady'],
  debug: {
    context: 'cartBadge'
  },
  computed: {
    cartQty () {
      let quantity = 0
      this.$app.user.cart.forEach(product => {
        quantity += product.quantity
      })
      return quantity
    },
    cart () {
      return this.$app.user.cart
    }
  }
}
</script>

<style lang="stylus" scoped>
// *Re-enable when needed
@media (min-width: 2560px)
  .q-badge
    font-size 2rem
    height 3rem
    width 3rem
</style>
