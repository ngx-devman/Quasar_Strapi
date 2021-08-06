<template>
  <div class="fit text-black q-pb-sm overflow-hidden container-wrapper">
    <q-btn
      v-if='!noCloseBtn'
      class="absolute-top-right closeBtn q-ma-sm text-black index-9"
      round
      color="white"
      icon="close"
      @click="$emit('close')"
    ></q-btn>
    <Cart
      :showFooter='showFooter'
      :cart="cart"
      :productionId="productionId"
      :customerId="customerId"
      @cartClear="clearCartData()"
      @closeAll="closeAll"
      :currentTimeMs="currentTimeMs"
      :directCheckoutEnable="directCheckoutEnable"/>
  </div>
</template>
<script>
import Cart from './Cart/Cart'
export default {
  props: [
    'bubbleItem',
    'items',
    'cart',
    'productionId',
    'customerId',
    'currentTimeMs',
    'directCheckoutEnable',
    'showFooter',
    'noCloseBtn'
  ],
  components: {
    Cart
  },
  data () {
    return {}
  },
  methods: {
    clearCartData () {
      // new
      this.$emit('cartClear')
    },

    closeAll () {
      this.$emit('closeAll')
    }
  },
  computed: {}
}
</script>
<style lang="stylus" scoped>
.overflow-hidden {
  overflow: hidden;
}

.index-9 {
  z-index: 9;
}
.container-wrapper
  background-color rgba(0, 0, 0, 0.66)
// *Re-enable when needed
@media (min-width: 2560px)
  .closeBtn
    font-size 2.5em
</style>
