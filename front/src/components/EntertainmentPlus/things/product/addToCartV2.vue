<template>
  <div>
    <div v-if="variant && variant.available" class="add-to-cart">
      <q-btn @click="add" :loading="loading" no-caps color="primary" class="full-width">
        {{ $t("addToCart") }}
        <template v-slot:loading>{{ $t("addedToCart") }} ✨</template>
      </q-btn>
      <q-btn v-if="qtyInTheCart > 0" @click="$emit('showCart')" no-caps color="grey" class="full-width q-mt-md">
        {{ $t("viewInCart") + ` (${qtyInTheCart})`}}
      </q-btn>
    </div>
    <div v-else>
      <q-btn no-caps color="grey" class="full-width">
        Out of Stock
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['variant', 'storefront', 'thing'],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    qtyInTheCart () {
      let quantity = 0
      this.$app.user.cart.forEach(product => {
        if (product.id === this.variant.id) quantity = product.quantity
      })
      return quantity
    }
  },
  methods: {
    add () {
      this.loading = true
      this.$analytics(this.$common.constants.events.action, this.thing.dataObject.data.externalProductId)
      this.$pulse('activationAction', { id: this.thing.dataObject.data.externalProductId })
      setTimeout(() => { this.loading = false }, 3000) // Triggers the "added to cart" button state above
      this.$store.dispatch('config/cartUpdateQty', { thing: this.variant, qty: 1, storefront: this.storefront })
    }
  }
}
</script>

<style lang="stylus" scoped >
// *Re-enable when needed
@media (min-width: 2560px)
  /deep/.add-to-cart
    font-size 1.5em
</style>
