<template>
    <q-card class="row no-wrap q-mx-md q-mb-sm q-pa-md">
      <div>
        <img class="cart-small-image" :src="image" />
      </div>

      <div class="full-width">
        <div class="row no-wrap items-start justify-between">
          <p class="subtitle" style="width: 70%;">{{ title }} {{ subtitle }}</p>
          <q-btn no-caps flat @click="del(item)">
            {{$t("remove")}}
          </q-btn>
        </div>

        <div class="row items-center justify-between">
          <div class="row items-center">
            <q-btn @click="sub(item)" flat>-</q-btn>
            <p class="q-mb-none q-mx-sm">{{ item.quantity }}</p>
            <q-btn @click="add(item)" flat>+</q-btn>
          </div>

          <p class="q-mb-none q-mr-sm">{{ (price * item.quantity) | currency }}</p>
        </div>
      </div>
    </q-card>
</template>

<script>
export default {
  props: ['item'],
  debug: { context: 'cartItem' },
  computed: {
    image () {
      return this.item.image || this.item.dataObject.mainImageUrl
    },
    title () {
      return this.item.title || this.item.dataObject.data.name
    },
    subtitle () {
      return this.item.subtitle || ''
    },
    price () {
      return this.item.price || this.item.dataObject.data.lowestPrice
    }
  },
  methods: {
    del (thing) {
      this.$store.dispatch('config/cartUpdateQty', { thing, qty: -Infinity })
    },
    add (thing) {
      this.$store.dispatch('config/cartUpdateQty', { thing: thing, qty: 1, storefront: thing.storefront })
    },
    sub (thing) {
      this.$store.dispatch('config/cartUpdateQty', { thing: thing, qty: -1, storefront: thing.storefront })
    }
  },
  filters: {
    currency (price) {
      return '$' + price.toFixed(2)
    }
  }
}
</script>

<style lang="stylus" scoped>
.cart-small-image {
  height: 4.5em;
  width: 4.5em;
  object-fit: contain;
  margin-right: 1em;
  border-radius: 4px;
}
// *Re-enable when needed
@media (min-width: 2560px)
  .cart-small-image
    height 15em
    width 15em
    margin-right: 2em
  p
    font-size 2.5em
  /deep/.row.items-center .q-btn__content
    font-size 1.5em
  /deep/.q-btn--rectangle .q-btn__wrapper
    padding 0em .2em!important
    font-size 2.5em!important
</style>
