<template>
  <div class="full-height">
    <div class="row justify-center q-my-md">
      <div v-if="!purchaseFinished">
        <p class="text-h4 text-black q-ma-none">{{ $t("checkout") }}</p>
      </div>
      <div class="row items-center" v-else>
        <div class="q-pa-xs q-mr-md bold-border">
          <q-icon name="done" class="text-primary big-font" />
        </div>
        <p class="text-h4 text-black q-ma-none">{{ $t("orderComplete") }}</p>
      </div>
    </div>
    <q-stepper
      keep-alive
      v-model="step"
      ref="stepper"
      color="primary"
      class="full-height q-pb-lg overflow no-shadow"
      animated
      v-if="purchaseFinished === 0"
    >
      <!-- Cart section -->
      <q-step :name="1" title="Cart" :done="step > 1">
        <CartPage :cart="cart" />
      </q-step>
      <!-- Info section -->
      <q-step
        :name="2"
        prefix=">"
        title="Info"
        :done="step > 2"
        class="full-height full-width overflow"
      >
        <Info
          @nextTab="nextStep"
          @email="contactInfo"
          :productionId="productionId"
          :customerId="customerId"
          :currentTimeMs="currentTimeMs"
        />
        <q-stepper-navigation>
          <div class="row justify-center q-mt-md">
            <q-btn
              flat
              no-caps
              color="primary"
              @click="stepBack"
              label="Return to cart"
              class="q-ml-sm"
            ></q-btn>
          </div>
        </q-stepper-navigation>
      </q-step>
      <!-- ShippingMethod section -->
      <q-step :name="3" prefix=">" :done="step > 3" title="Shipping method">
        <ShippingMethod
          @changeToInfo="step = 2"
          @nextTab="step = 4"
          @emitDelievery="shippingMethod"
          :email="email"
          :address="address"
          :cart="cart"
          :firstName="firstName"
          :lastName="firstName"
          :buildType="buildType"
          :city="city"
          :zip="zip"
          :province="province"
          :productionId="productionId"
          :customerId="customerId"
          :currentTimeMs="currentTimeMs"
        />
        <q-stepper-navigation></q-stepper-navigation>
      </q-step>
      <!-- Payment section -->
      <q-step :name="4" prefix=">" title="Payment">
        <Payment
          @changeToInfo="step = 2"
          @changeToShippingMethod="step = 3"
          :email="email"
          :address="address"
          :delievery="delievery"
          :priceEconom="priceEconom"
          :priceFast="priceFast"
          :economyTitle="economyTitle"
          :expressTitle="expressTitle"
          :cart="cart"
          :total="total"
          :tax="tax"
          @inputCard="updateCard"
          @inputExpiryMonth="updateExpiryMonth"
          @inputExpiryYear="updateExpiryYear"
          @inputCvc="updateCvc"
          @makeStripePayment="makeStripePayment"
          :productionId="productionId"
          :customerId="customerId"
          :currentTimeMs="currentTimeMs"
          :firstName="firstName"
          :lastName="lastName"
          :buildType="buildType"
          :city="city"
          :zip="zip"
          :state="state"
          :phone="phone"
          :checkoutId="checkoutId"
          :stripePublicKey="stripePublicKey"
          @stripeResponseData="stripeResponseData"
          @billingData="billingData"
        />
        <q-stepper-navigation></q-stepper-navigation>
      </q-step>
    </q-stepper>
    <template v-if="purchaseFinished">
      <div class="q-pa-md overflow" style="height: 90%;">
        <q-card class="q-pa-md q-mb-md column items-center">
          <p class="text-h5 text-black q-mb-xs">
            {{ $t("thankYou") }} {{ firstName }}!
          </p>
          <div class="text-grey-8">{{ $t("orderConfirmed") }}</div>
        </q-card>
        <q-card class="q-pa-md column items-center">
          <p class="text-h5 text-black">{{ $t("orderInformation") }}</p>
          <div class="row q-mb-md">
            <div class="col q-mr-sm">
              <div class="row">
                <div class="text-h6 text-black q-ma-none">
                  {{ $t("contact") }}
                </div>
                <div class="text-grey-8">{{ email }}</div>
              </div>
            </div>
            <div class="col">
              <p class="text-h6 text-black q-ma-none">
                {{ $t("shippingAddress") }}
              </p>
              <p class="text-grey-8 q-ma-none">
                {{ firstName }} {{ lastName }}
              </p>
              <p class="text-grey-8 q-ma-none">{{ address1 }}</p>
              <p class="text-grey-8 q-ma-none">{{ address2 }}</p>
              <p class="text-grey-8 q-ma-none">{{ city }}</p>
              <p class="text-grey-8 q-ma-none">{{ zip }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row q-mr-sm">
                <div class="text-h6 text-black q-ma-none">
                  {{ $t("shippingMethod") }}
                </div>
                <div class="text-grey-8">{{ shippingTitle }}</div>
              </div>
            </div>
            <div class="col"></div>
          </div>
        </q-card>
        <div class="row">
          <div class="col">
            <q-btn
              size="lg"
              @click="backToCart"
              color="primary"
              label="Done"
              class="full-width q-mt-md"
            ></q-btn>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import Info from '../Info/Info'
import ShippingMethod from '../ShippingMethod/ShippingMethod'
import Payment from '../Payment/Payment'
import state from '../../../store/config/state'
export default {
  props: [
    'bubbleItem',
    'items',
    'cart',
    'total',
    'cartView',
    'currentTimeMs',
    'productionId',
    'customerId',
    'checkoutId',
    'stripePublicKey'
  ],
  components: {
    CartPage: () => import('../Cart/Cart.vue'),
    Info,
    ShippingMethod,
    Payment
  },
  data () {
    return {
      step: 2,
      email: '',
      address: '',
      delievery: '',
      priceEconom: '',
      priceFast: '',
      economyTitle: '',
      expressTitle: '',
      province: '',
      tax: 0,
      card: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
      purchaseFinished: 0,

      firstName: '',
      lastName: '',
      buildType: '',
      city: '',
      zip: '',
      state: '',
      phone: '',
      stripeRespData: {},
      billingInfo: {}
    }
  },
  methods: {
    stepBack () {
      this.$refs.stepper.previous()
      this.$emit('cartViewShow')
    },
    prevStep () {
      this.$refs.stepper.previous()
    },
    nextStep () {
      this.$refs.stepper.next()
      this.$emit('close')
    },
    contactInfo (data) {
      this.email = data.email
      this.address = data.address
      this.buildType = data.buildType
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.city = data.city
      this.zip = data.zip
      this.province = data.province
      this.address1 = data.address1
      this.address2 = data.address2
      this.phone = data.phone
      // save shipping data using shipping service for logged in user
      var dataObj = {
        'userShipping': {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'address1': this.address,
          'address2': this.buildType,
          'city': this.city,
          'zip': this.zip,
          'country': state.country,
          'province': this.province
        }
      }
      var email = localStorage.getItem('email')
      var mobile = localStorage.getItem('mobile')
      var token = localStorage.getItem('token')
      if (email !== '' || mobile !== '' || token !== '') {
        var self = this
        this.$common.timeline.callUserShipping(dataObj)
          .then(function (response) {
            self.firstName = response.shippingAddress.firstName
            self.lastName = response.shippingAddress.lastName
            self.address = response.shippingAddress.address1
            self.buildType = response.shippingAddress.address2
            self.city = response.shippingAddress.city
            self.zip = response.shippingAddress.zip
            self.state = response.shippingAddress.province
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    shippingMethod (data) {
      this.delievery = data.delievery
      this.priceEconom = data.priceEconom
      this.priceFast = data.priceFast
      this.economyTitle = data.economyTitle
      this.expressTitle = data.expressTitle
      this.tax = data.tax
    },
    updateCard (val) {
      this.card = val
    },
    updateExpiryMonth (val) {
      this.expiryMonth = val
    },
    updateExpiryYear (val) {
      this.expiryYear = val
    },
    updateCvc (val) {
      this.cvc = val
    },
    stripeResponseData (val) {
      this.stripeRespData = val
      this.makeStripePayment()
    },
    billingData (val) {
      this.billingInfo = val
    },
    makeStripePayment () {
      var expiry = this.expiryMonth
      var month = this.expiryMonth
      this.month = month.replace(/^0+/, '')
      var year = this.expiryYear
      this.fullYear = ''
      if (expiry !== '' && year.length === 2) {
        var intYear = parseInt(year, 10)
        if (intYear > 50) {
          this.fullYear = '19' + year
        } else {
          this.fullYear = '20' + year
        }
      }
      this.type = 'card'
      if (this.delievery === this.priceEconom) {
        this.shippingTitle = this.economyTitle
        this.shippingId = 'economy'
      } else {
        this.shippingTitle = this.expressTitle
        this.shippingId = 'express'
      }
      var clientId = this.cart[0].externalCatalog
      var dataObj = {
        request: {
          id: this.checkoutId,
          email: this.email,
          billingAddress: this.billingAddress,
          shippingAddress: {
            firstName: this.firstName,
            lastName: this.lastName,
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            province: this.province,
            zip: this.zip
          },
          shippingRate: {
            id: this.shippingId,
            title: this.shippingTitle,
            price: this.delievery
          }
        }
      }
      var charges = []
      charges.push(this.stripeRespData.charge)
      dataObj.request.data = this.stripeRespData.data
      dataObj.charges = charges
      dataObj.client = clientId

      this.$axios
        .post(state.server + 'checkout/purchase', dataObj)
        .then(response => {
          if (response.data.success === false) {
            this.purchaseFinished = 0
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Your order couldn\'t be processed'
            })
          } else {
            this.purchaseFinished = 1
            this.finish()
          }
        })
        .catch(() => {
          this.checkoutFailed()
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Your order couldn\'t be processed'
          })
          this.purchaseFinished = 0
          // eslint-disable-next-line no-console
          console.log('error')
        })
    },
    finish () {
      var self = this
      var cartData = []
      Object.keys(this.cart).forEach(key => {
        let cartItem = self.cart[key]
        var itemData = {
          title: cartItem.title,
          price: cartItem.price,
          quantity: cartItem.quantity
        }
        cartData.push(itemData)
      })
      var dataObj = {
        draft_order:
        {
          line_items: cartData,
          address: {
            city: self.billingInfo.city,
            company: '',
            countryId: self.country,
            email: self.email,
            firstName: self.billingInfo.firstName,
            lastName: self.billingInfo.lastName,
            postcode: self.billingInfo.zip,
            region: self.billingInfo.province,
            street: [
              self.billingInfo.address1
            ],
            telephone: ''
          },
          useForShipping: true,
          addressInformation: {
            billingAddress: {
              city: self.billingInfo.city,
              company: '',
              email: self.email,
              firstName: self.billingInfo.firstName,
              lastName: self.billingInfo.lastName,
              postcode: self.billingInfo.zip,
              region: self.billingInfo.province,
              street: [
                self.billingInfo.address1
              ],
              telephone: ''
            },
            shippingAddress: {
              city: self.city,
              company: '',
              email: self.email,
              firstName: self.firstName,
              lastName: self.lastName,
              postcode: self.zip,
              region: self.province,
              street: [
                self.address1
              ],
              telephone: ''
            },
            shippingCarrierCode: self.shippingId,
            shippingMethodCode: self.shippingId
          },
          paymentMethod: {
            method: 'stripe'
          },
          shippingMethod: {
            method_code: self.shippingId,
            carrier_code: self.shippingId,
            additionalProperties: {

            }
          }
        }
      }
      // call order api
      var clientId = this.cart[0].externalCatalog
      self.$common.timeline
        .callOrder(dataObj, clientId)
        .then(function (response) {
        })
        .catch((error) => {
          console.error(error)
        })
      this.purchaseFinished = 1
      this.$emit('cartClear')
      // call pulse after completing order
      /*
      var cart = this.getCartData()
      var paramObj = {
        typeVal: 'checkoutComplete',
        productionId: this.productionId,
        customerId: this.customerId,
        timelineId: 'default',
        currentTimeMs: this.currentTimeMs,
        cart: cart
      }
      // this.$common.timeline.callPulse(paramObj)
      */
    },
    checkoutFailed () {
      // call pulse after completing order
      /*
      var paramObj = {
        typeVal: 'checkoutFailed',
        productionId: this.productionId,
        customerId: this.customerId,
        timelineId: 'default',
        currentTimeMs: this.currentTimeMs,
        error: this.$t('checkoutFailedErr')
      }
      // this.$common.timeline.callPulse(paramObj)
      */
    },
    backToCart () {
      this.$emit('closeAll')
    },
    getCartData () {
      var cartData = []
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
        cartData.push(itemData)
      })
      return cartData
    }
  }
}
</script>
<style lang="stylus" scoped>
.overflow {
  overflow-y: auto;
}
.bold-border {
  border: 2px solid #027be3;
  border-radius: 50%;
}
.big-font {
  font-size: 1.3em;
}
/deep/.q-stepper__content.q-panel-parent {
  // height: 460px;
}
/deep/ .q-stepper__dot {
  display: none;
}
/deep/.q-stepper__header--standard-labels .q-stepper__tab:last-child {
  justify-content: center;
}
/deep/ .q-stepper__tab {
  padding: 5px;
}
/deep/ .q-stepper__header {
  margin: 0 20px;
}
/deep/.q-stepper__nav {
  padding-top: 0;
}
</style>
