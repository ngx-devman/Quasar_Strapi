<template>
  <div>
    <q-btn
      v-if=" thing.dataObject.data.price"
      @click="add"
      :loading="loading"
      no-caps color="primary" class="full-width"
    >
      {{ $t("addToCart") }}
      <template v-slot:loading>{{ $t("addedToCart") }} ✨</template>
    </q-btn>
    <q-btn
      v-if="qtyInTheCart > 0"
      @click="$emit('showCart')"
      no-caps color="grey" class="full-width q-mt-md"
    >
    {{ $t("viewInCart") + ` (${qtyInTheCart})`}}
    </q-btn>
  </div>
</template>

<script>
export default {
  props: ['thing'],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    qtyInTheCart () {
      let quantity = 0
      this.$app.user.cart.forEach(product => {
        if (product.id === this.thing.id) quantity = product.quantity
      })
      return quantity
    }
  },
  methods: {
    add () {
      this.loading = true
      this.$analytics(this.$common.constants.events.action, this.thing.id)
      setTimeout(() => { this.loading = false }, 3000) // Triggers the "added to cart" button state above
      this.$store.dispatch('config/cartUpdateQty', { thing: this.thing, qty: 1 })
    }
  }
}
</script>
