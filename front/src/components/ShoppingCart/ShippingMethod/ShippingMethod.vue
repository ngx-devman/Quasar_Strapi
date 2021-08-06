<template>
  <div class="full-height">
    <q-card>
      <div class="row justify-between items-center no-wrap q-pa-md">
        <div class="row">
          <div class="text-grey-8 q-mr-md small-width">{{ $t("contact") }}</div>
          <div>{{ email }}</div>
        </div>

        <q-btn color="primary" no-caps flat @click="changeToInfo">{{
          $t("change")
        }}</q-btn>
      </div>

      <q-separator></q-separator>

      <div class="row justify-between items-center no-wrap q-pa-md">
        <div class="row">
          <div class="text-grey-8 q-mr-md small-width">{{ $t("shipTo") }}</div>
          <div>{{ address }}</div>
        </div>

        <q-btn color="primary" no-caps flat @click="changeToInfo()">{{
          $t("change")
        }}</q-btn>
      </div>
    </q-card>

    <p class="text-h6 q-mt-md q-mb-xs">{{ $t("shippingAddress") }}</p>
    <q-card>
      <div
        class="row justify-between items-center no-wrap q-pa-md"
        v-for="shipMethod in shippingMethods"
        :key="shipMethod.id"
      >
        <q-radio
          default
          v-model="delieveryType"
          :val="shipMethod.id"
          :label="shipMethod.title"
          class="q-mr-sm"
          @input="shippingApi(shipMethod.price)"
        ></q-radio>
        <div class="q-ml-md">{{ shipMethod.price | currency }}</div>
        <q-separator></q-separator>
      </div>
    </q-card>

    <q-btn
      @click="emitDelievery"
      size="lg"
      no-caps
      color="primary"
      label="Continue to payment"
      class="full-width q-mt-md"
      :disabled='disableFlag'
    ></q-btn>

    <div class="row justify-center q-mt-md">
      <q-btn
        flat
        no-caps
        color="primary"
        @click="changeToInfo"
        label="Return to cart"
        class="q-ml-sm"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import state from '../../../store/config/state'
export default {
  props: [
    'bubbleItem',
    'items',
    'cart',
    'email',
    'address',
    'firstName',
    'lastName',
    'buildType',
    'city',
    'zip',
    'province',
    'phone',
    'productionId',
    'customerId',
    'currentTimeMs'
  ],
  components: {},
  data () {
    return {
      priceEconom: 5.95,
      priceFast: 14.99,
      economyTitle: 'Economy Shipping (Typical Delivery in 4-7 Business Days)',
      expressTitle: 'Two Business Day Shipping (If order placed by 2 PM EST)',
      delievery: 0,
      delieveryType: '',
      shippingMethods: [],
      tax: 0,
      disableFlag: false
    }
  },
  methods: {
    changeToInfo () {
      this.$emit('changeToInfo')
    },
    emitDelievery () {
      // Make sure shipping method is selected
      if (this.delieveryType === '') {
        this.$q.notify({
          color: 'red-4',
          textColor: 'red',
          icon: 'cloud_done',
          message: 'Select shipping method'
        })
        return false
      }
      this.$emit('nextTab')
      this.$emit('emitDelievery', {
        delievery: this.delievery,
        priceEconom: this.priceEconom,
        priceFast: this.priceFast,
        economyTitle: this.economyTitle,
        expressTitle: this.expressTitle,
        tax: this.tax
      })
    },
    shippingApi (shipMethodPrice) {
      // call shipping api & pass cart and shippingAddress data etc
      var dataObj = {}
      dataObj.shippingAddress = {
        firstName: this.firstName,
        lastName: this.lastName,
        address1: this.address,
        address2: this.buildType,
        city: this.city,
        zip: this.zip,
        country: state.country, // from config
        phone: this.phone,
        province: this.province
      }
      dataObj.cart = []
      var amount = 0
      Object.keys(this.cart).forEach(key => {
        let cartItem = this.cart[key]
        let itemAmount = (cartItem.quantity * cartItem.price)
        amount += itemAmount
        var itemObj = {
          product: {
            id: cartItem.id,
            dataTypeId: cartItem.dataTypeId,
            dataType: cartItem.dataType,
            dataTypeName: cartItem.dataTypeName,
            dataTypeDisplayName: cartItem.dataTypeDisplayName,
            name: cartItem.title,
            description: '',
            timelineText: cartItem.title,
            mainImageUrl: cartItem.img,
            data: {
              name: cartItem.title,
              description: cartItem.description,
              brandName: cartItem.brandName,
              externalProductId: cartItem.externalProductId,
              externalCatalog: cartItem.externalCatalog,
              basePrice: cartItem.price,
              lowestPrice: cartItem.price,
              itemCode: cartItem.itemCode,
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
        dataObj.cart.push(itemObj)
        dataObj.customerId = this.customerId
        dataObj.amount = amount + this.delievery + this.tax
        dataObj.selectedShippment = this.delievery
      })
      amount += (this.delievery + this.tax)
      amount = Number(amount.toFixed(2))
      dataObj.amount = amount
      dataObj.selectedShippment = shipMethodPrice

      var self = this
      this.$common.timeline
        .callShippingCheckout(dataObj)
        .then(function (response) {
          self.disableFlag = false
          Object.keys(response.shippingRates).forEach(key => {
            let val = response.shippingRates[key]
            if (val.id === 'economy') {
              self.economyTitle = val.title
            } else if (val.id === 'express') {
              self.expressTitle = val.title
            }
            if (self.delieveryType === val.id) {
              self.delievery = val.price
            }
          })
          self.tax = response.tax
        })
        /* eslint handle-callback-err: "error" */
        .catch(function (error) {
          console.error('selection error: ', error)
          self.disableFlag = true
          return self.showError()
        })
    },
    showError () {
      var self = this
      // show error message if shipping service response fails
      self.$q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Error occured'
      })
      return false
    }
  },
  mounted () {
    // Get the shipping methods & rates from service
    var self = this
    this.$common.timeline
      .callCheckoutShipping()
      .then(function (response) {
        self.shippingMethods = response.shippingRates
        self.tax = response.tax
      })
      .catch((error) => {
        console.error(error)
      })

    // call pulse service
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
            buttonRedirectUrl:
                cartItem.buttonRedirectUrl,
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
    /*
    var paramObj = {
      'typeVal': 'completeCheckoutStep',
      'productionId': this.productionId,
      'customerId': this.customerId,
      'timelineId': 'default',
      'currentTimeMs': this.currentTimeMs,
      'step': 'Information',
      'cart': cartData

    }
    */
    // this.$common.timeline.callPulse(paramObj)
  },
  created () {},
  computed: {},
  filters: {
    currency (price) {
      return '$' + price.toFixed(2)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
