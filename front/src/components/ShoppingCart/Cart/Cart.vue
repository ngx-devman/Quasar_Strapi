<template>
  <div class="full-height">
    <!-- Show the cart -->
    <template v-if="cartView">
      <div class='scroll fit'>
      <!-- <q-scroll-area class="fit"> -->
        <!-- Cart header -->
        <div class="row justify-center q-mt-sm">
          <p class="text-h4 text-white q-ma-none">{{ $t("cart") }}</p>
        </div>
        <q-separator inset class="q-my-sm"></q-separator>

        <!-- Product list -->
        <p v-if="cart.length === 0" class="text-center text-white text-subtitle1">{{ $t("emptyCart") }}</p>
        <div v-else id="SDpopMarketCartItems">
          <cart-item v-for="(item, id) in cart" :key="'cartItem-' + id" :item="item" />

          <!-- Cart footer -->
          <q-card v-if='displayFooter' class="q-pa-md q-mx-md subtotal-card" id="SDpopMarketCartFooter">
            <div class="row justify-between text-black text-subtitle1">
              <p>{{ $t("subtotal") }}</p>
              <p>{{ total | currency }}</p>
            </div>
            <!-- Checkout button -->
            <q-btn :disabled="cart.length === 0" no-caps size="lg" class="full-width checkout-btn" color="primary" :label="$t('checkout')" @click="checkout">
            </q-btn>
          </q-card>
        </div>
      </div>
      <!-- </q-scroll-area> -->
    </template>

    <!-- Show info gathering -->
    <template v-else>
      <Stepper
        @cartClear="clearCartData()"
        @closeAll="closeAll"
        :cart="cart"
        :total="total"
        :productionId="productionId"
        :customerId="customerId"
        :currentTimeMs="currentTimeMs"
        :checkoutId="checkoutId"
        :stripePublicKey="stripePublicKey"
      />
    </template>
    <q-dialog v-model="showConfirmExternalCheckoutDialog" persistent>
      <q-card v-if="!externalCheckoutPreflight" class='text-black'>
        <q-card-section class="row items-center">
          <q-spinner-gears size="50px" color="primary" />
          <span class="q-ml-sm">{{$t('waitForCheckout')}}</span>
        </q-card-section>
      </q-card>
      <q-card v-else class='text-black'>
        <q-card-section class="row items-center">
          <q-avatar icon="shopping_cart" color="primary" text-color="white" />
          <span class="q-ml-sm">{{$t('proceedToCheckout')}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup @click="remoteCheckoutCanceled" />
          <q-btn flat :label="$t('proceed')" color="primary" v-close-popup @click="remoteCheckoutConfirmed" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Stepper from '../Stepper/Stepper'
import CartItem from './CartItem'
export default {
  components: { Stepper, CartItem },
  props: ['showFooter'],
  data () {
    return {
      debug: this.$debug.extend('Cart'),
      showConfirmExternalCheckoutDialog: false,
      externalCheckoutPreflight: null,
      cartView: true,
      shippingMethod: false,
      checkoutId: '',
      stripePublicKey: ''
    }
  },
  events: {
    async checkoutStart () {
      if (this.checkout) await this.checkout()
    },
    checkoutDialog () {
      this.showConfirmExternalCheckoutDialog = true
    }
  },
  methods: {
    hasDirCheckoutInCart () {
      if (this.cart.length > 0) {
        Object.keys(this.cart).forEach(key => {
          let cartItem = this.cart[key]
          if (cartItem.direct_checkout_enable === true) {
            return true
          } else {
            return false
          }
        })
      }
      return true
    },
    // Checkout through the standard platform means...
    checkoutStandard () {
      var errFlag = 0
      for (let i = 0; i < this.cart.length; i++) {
        // call stock service and check quantity is allowed
        var self = this
        this.$common.timeline
          .callStock(self.cart[i].externalProductId, self.cart[i].externalCatalog)
          .then(function (response) {
            var resp = self.validateQuantity(
              response,
              self.cart[i].quantity,
              self.cart[i].title
            )
            if (!resp) {
              errFlag = 1
              self.cartView = true
            }
          })
      }

      if (!errFlag) {
        this.cartView = false
      }

      // send cart data to checkout/cart service
      var dataObj = {}
      dataObj.cart = []
      Object.keys(this.cart).forEach(key => {
        let cartItem = this.cart[key]
        var itemData = {
          product: {
            id: cartItem.id,
            dataTypeId: cartItem.dataTypeId,
            dataTypeName: 'product',
            dataTypeDisplayName: 'Products',
            name: cartItem.title,
            description: '',
            timelineText: cartItem.title,
            mainImageUrl: cartItem.img,
            data: {
              name: cartItem.title,
              description: '',
              brandName: '',
              shoppingLink: cartItem.shoppingLink,
              price: cartItem.price,
              basePrice: cartItem.price,
              lowestPrice: cartItem.price,
              buttonRedirectUrl: cartItem.buttonRedirectUrl,
              buttonText: cartItem.buttonText,
              externalCatalog: cartItem.externalCatalog,
              itemCode: cartItem.itemCode,
              reactorOneProductSlug: cartItem.reactorOneProductSlug,
              extendedProductId: cartItem.extendedProductId,
              supportsNativeCommerce: true
            },
            cpm: null,
            cpc: null,
            defaultBrandId: cartItem.defaultBrandId,
            modalExtensionIconType: cartItem.modalExtensionIconType,
            productSuggestions: {
              specificProducts: [],
              enabledMarketplaceIds: [],
              keywords: null
            }
          },
          variant: {
            id: '4345645858898',
            salePrice: cartItem.price,
            externalMediaIds: [],
            details: {}
          },
          quantity: cartItem.quantity
        }
        dataObj.cart.push(itemData)
      })

      // checkout/cart service call
      this.$common.timeline.callCheckout(dataObj)
        .then(function (response) {
          self.checkoutId = response.id
          self.stripePublicKey = response.data.publicKey
        })
        .catch(function (error) {
          /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
          console.error(error)
        })

      // call pulse service
      /*
      var paramObj = {
        typeVal: 'startCheckout',
        productionId: this.productionId,
        customerId: this.customerId,
        timelineId: 'default',
        currentTimeMs: this.currentTimeMs,
        cart: dataObj.cart
      }

      // this.$common.timeline.callPulse(paramObj)
      */
    },
    remoteCheckoutConfirmed () {
      this.$analytics(this.$common.constants.events.action)
      // if (this.$q.platform.is.ios) {
      //   const link = document.createElement('a')
      //   link.setAttribute('href', this.externalCheckoutPreflight.webUrl)
      //   link.click()
      // } else window.open(this.externalCheckoutPreflight.webUrl)
      window.open(this.externalCheckoutPreflight.webUrl)
      this.$store.dispatch('config/cartClear')
      this.externalCheckoutPreflight = null
      this.showConfirmExternalCheckoutDialog = false
    },
    remoteCheckoutCanceled () {
      this.$analytics(this.$common.constants.events.action)
      this.externalCheckoutPreflight = null
      this.showConfirmExternalCheckoutDialog = false
    },
    async checkout () {
      // Process each storefront...
      const storefronts = {}
      // Load each storefront items...
      Object.keys(this.$common.products.storefronts).forEach(name => {
        this.debug('PROCESSING STOREFRONT', name, this.cart)
        storefronts[name] = []

        function hasStorefront (name, item) {
          if (item.storefront === name) return true
          if (item.dataObject && item.dataObject.data && item.dataObject.data.externalCatalog === name) return true
          return false
        }

        this.cart.forEach(item => {
          if (hasStorefront(name, item)) {
            storefronts[name].push(item)
            this.debug('Found in ', name, item)
          }
        })
      })
      if (this.displayPreFlight) {
        this.showConfirmExternalCheckoutDialog = true
      } else {
        // Checks for externalCheckoutPreflight. Once it gets its data, move onto immediate check out.
        let gatheredItems = setInterval(() => {
          if (this.externalCheckoutPreflight) {
            this.debug('Items Gathered', this.externalCheckoutPreflight)
            clearInterval(gatheredItems)
            this.remoteCheckoutConfirmed()
          }
        }, 100)
      }
      // Checkout with each storefront...
      Object.keys(storefronts).forEach(async name => {
        const items = storefronts[name].length
        if (items > 0) {
          this.debug(`Cart processor found ${items} in ${name}`)
          this.externalCheckoutPreflight = await this.$common.products.checkout(this.cart, name)
        }
      })
    },
    clearCartData () {
      this.$emit('cartClear')
    },
    closeAll () {
      this.$emit('closeAll')
    },
    validateQuantity (allowedQty, addedQuantity, productName) {
      var self = this
      if (allowedQty > 0 && addedQuantity > allowedQty) {
        self.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: productName + ' has been sold out, please update quantity'
        })
        return false
      } else {
        return true
      }
    }
  },
  computed: {
    // The actual shopping cart comes from vuex...
    cart () {
      return this.$app.user.cart
    },
    total () {
      return this.cart.reduce((n, item) => {
        const price = item.price || item.dataObject.data.lowestPrice
        return price * item.quantity + n
      }
      , 0)
    },
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '5px'
      }
    },
    displayFooter () {
      return this.showFooter !== false
    },
    displayPreFlight () {
      return this.$app.settings.preFlightDialog !== false
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
// *Re-enable when needed
@media (min-width: 2560px)
  /deep/.text-h4
    font-size 5em
    margin .5em 0
  /deep/.text-subtitle1
    font-size 2.5em
  /deep/.q-btn--rectangle .q-btn__wrapper
    padding .5em .5em
    font-size 2.5em
  /deep/.subtotal-card
    padding: 2em 2em
</style>
