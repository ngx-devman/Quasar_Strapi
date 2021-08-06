<template>
  <div class="full-height">
    <q-card>
      <div class="row justify-between items-center no-wrap q-pa-md">
        <div class="row">
          <div class="text-grey-8 q-mr-md small-width">{{ $t("contact") }}</div>
          <div>{{ email }}</div>
        </div>
        <q-btn color="primary" no-caps flat @click="changeToInfo">
          {{ $t("change") }}
        </q-btn>
      </div>
      <q-separator></q-separator>
      <div class="row justify-between items-center no-wrap q-pa-md">
        <div class="row no-wrap">
          <div class="text-grey-8 q-mr-md small-width">{{ $t("shipTo") }}</div>
          <div>{{ address }}</div>
        </div>
        <q-btn color="primary" no-caps flat @click="changeToInfo">
          {{ $t("change") }}
        </q-btn>
      </div>
      <q-separator></q-separator>
      <div class="row justify-between items-center no-wrap q-pa-md">
        <div class="row no-wrap">
          <div class="text-grey-8 q-mr-md small-width">{{ $t("method") }}</div>
          <div>
            <template v-if="delievery === priceEconom">{{
              economyTitle
            }}</template>
            <template v-else>{{ expressTitle }}</template>
            • {{ delievery | currency }}
          </div>
        </div>
        <q-btn color="primary" no-caps flat @click="changeToShippingMethod">
          {{ $t("change") }}
        </q-btn>
      </div>
    </q-card>
    <p class="text-h6 q-mt-md q-mb-xs">{{ $t("payment") }}</p>
    <p class="text-caption q-mb-xs">{{ $t("transaction") }}</p>
    <!-- Payment form -->
    <q-form ref="paymentForm" class="payment-form">
      <q-card class="row no-wrap q-px-sm">
      <card class='stripe-card'
      :class='{ complete }'
      :stripe=stripePublicKey
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
      </q-card>
    </q-form>
    <p class="text-h6 q-mt-md q-mb-sm">{{ $t("billingAddress") }}</p>
    <q-card>
      <div class="row justify-between items-center no-wrap q-pa-md">
        <q-radio
          v-model="paymentAddress"
          :val="sameShippingAddress"
          :label="sameShippingAddress"
          class="q-mr-sm"
        ></q-radio>
      </div>
      <q-separator></q-separator>
      <div class="row justify-between items-center no-wrap q-pa-md">
        <q-radio
          v-model="paymentAddress"
          :val="differentShippingAddress"
          :label="differentShippingAddress"
        ></q-radio>
      </div>
      <template v-if="paymentAddress === differentShippingAddress">
        <q-form ref="myForm2" class="q-pa-md">
          <q-input
            outlined
            v-model="firstName2"
            label="First name"
            class="q-mb-md"
            :rules="[
              val => (val && val.length > 0) || 'Please type your First name'
            ]"
          ></q-input>
          <q-input
            outlined
            v-model="lastName2"
            label="Last name"
            class="q-mb-md"
            :rules="[
              val => (val && val.length > 0) || 'Please type your Last name'
            ]"
          ></q-input>
          <q-input
            outlined
            v-model="address2"
            label="Address"
            class="q-mb-md"
            :rules="[
              val => (val && val.length > 0) || 'Please type your Address'
            ]"
          ></q-input>
          <q-input
            outlined
            v-model="buildType2"
            label="Apartment, suite, etc. (optional)"
            class="q-mb-md"
          ></q-input>
          <q-input
            outlined
            v-model="city2"
            label="City"
            class="q-mb-md"
            :rules="[val => (val && val.length > 0) || 'Please type your City']"
          ></q-input>
          <q-select
            outlined
            v-model="state2"
            :options="states"
            label="State"
            class="q-mb-md"
            :rules="[val => val || 'Please type your State']"
          />
          <q-input
            outlined
            v-model="zip2"
            label="Zip"
            class="q-mb-md"
            :rules="[val => (val && val.length > 0) || 'Please type your Zip']"
          ></q-input>
          <q-input
            outlined
            v-model="phone"
            type="tel"
            label="Phone (optional)"
            class="q-mb-md"
          ></q-input>
        </q-form>
      </template>
    </q-card>
    <q-card class="bg-grey-2 q-mt-md">
      <q-expansion-item expand-separator @click="changeText = !changeText">
        <template v-slot:header>
          <q-item-section v-if="changeText">
            {{ $t("showOrderSummary") }}
          </q-item-section>
          <q-item-section v-else>{{ $t("hideOrderSummary") }}</q-item-section>
          <q-item-section
            class="items-end text-weight-bold"
            v-if="changeText"
            >{{ finishTotal | currency }}</q-item-section
          >
        </template>
        <div class="q-px-md">
          <q-card
            v-for="(item, id) in cart"
            :key="'id-' + id"
            class="row no-wrap q-my-md q-pa-md"
          >
            <div>
              <img class="cart-small-image" :src="item.img" />
            </div>
            <div class="full-width">
              <div>{{ item.title }}</div>

              <div class="row justify-between no-wrap full-width q-mt-sm">
                <div>{{ $t("quantity") }}: {{ item.quantity }}</div>
                <div>{{ (item.price * item.quantity) | currency }}</div>
              </div>
            </div>
          </q-card>
          <div class="row justify-between no-wrap full-width">
            <p class="text-grey-8">{{ $t("subtotal") }}</p>
            <p>{{ total | currency }}</p>
          </div>
          <div class="row justify-between no-wrap full-width">
            <p class="text-grey-8">{{ $t("shipping") }}</p>
            <p>{{ delievery | currency }}</p>
          </div>
          <div class="row justify-between no-wrap full-width">
            <p class="text-grey-8">Tax</p>
            <p>{{ tax | currency }}</p>
          </div>
          <q-separator inset class="q-my-md"></q-separator>
          <div class="row justify-between no-wrap full-width">
            <p>{{ $t("total") }}</p>
            <p class="text-weight-bold">{{ finishTotal | currency }}</p>
          </div>
        </div>
      </q-expansion-item>
    </q-card>
    <q-btn
      size="lg"
      no-caps
      @click="pay"
      color="primary"
      label="Complete order"
      class="full-width q-mt-md"
      :disabled='!complete'
    ></q-btn>
    <div class="row justify-center q-mt-md">
      <q-btn
        flat
        no-caps
        color="primary"
        @click="changeToShippingMethod"
        label="Return"
        class="q-ml-sm"
      ></q-btn>
    </div>
  </div>
</template>
<script>
import state from '../../../store/config/state'
import { Card, createToken } from 'vue-stripe-elements-plus'
export default {
  props: [
    'bubbleItem',
    'items',
    'cart',
    'email',
    'address',
    'delievery',
    'priceEconom',
    'priceFast',
    'economyTitle',
    'expressTitle',
    'total',
    'tax',
    'productionId',
    'customerId',
    'currentTimeMs',
    'firstName',
    'lastName',
    'buildType',
    'city',
    'zip',
    'state',
    'phone',
    'checkoutId',
    'stripePublicKey'
  ],
  components: { Card },
  data () {
    return {
      paymentAddress: 'Same as shipping address',
      sameShippingAddress: 'Same as shipping address',
      differentShippingAddress: 'Use a different billing address',
      firstName2: null,
      lastName2: null,
      address2: null,
      buildType2: null,
      city2: null,
      state2: null,
      zip2: null,
      phone2: null,
      changeText: true,
      states: [
        {
          label: 'Alabama',
          value: 'AL'
        },
        {
          label: 'Alaska',
          value: 'AK'
        },
        {
          label: 'American Samoa',
          value: 'AS'
        },
        {
          label: 'Arizona',
          value: 'AZ'
        },
        {
          label: 'Arkansas',
          value: 'AR'
        },
        {
          label: 'California',
          value: 'CA'
        },
        {
          label: 'Colorado',
          value: 'CO'
        },
        {
          label: 'Connecticut',
          value: 'CT'
        },
        {
          label: 'Delaware',
          value: 'DE'
        },
        {
          label: 'District Of Columbia',
          value: 'DC'
        },
        {
          label: 'Federated States Of Micronesia',
          value: 'FM'
        },
        {
          label: 'Florida',
          value: 'FL'
        },
        {
          label: 'Georgia',
          value: 'GA'
        },
        {
          label: 'Guam',
          value: 'GU'
        },
        {
          label: 'Hawaii',
          value: 'HI'
        },
        {
          label: 'Idaho',
          value: 'ID'
        },
        {
          label: 'Illinois',
          value: 'IL'
        },
        {
          label: 'Indiana',
          value: 'IN'
        },
        {
          label: 'Iowa',
          value: 'IA'
        },
        {
          label: 'Kansas',
          value: 'KS'
        },
        {
          label: 'Kentucky',
          value: 'KY'
        },
        {
          label: 'Louisiana',
          value: 'LA'
        },
        {
          label: 'Maine',
          value: 'ME'
        },
        {
          label: 'Marshall Islands',
          value: 'MH'
        },
        {
          label: 'Maryland',
          value: 'MD'
        },
        {
          label: 'Massachusetts',
          value: 'MA'
        },
        {
          label: 'Michigan',
          value: 'MI'
        },
        {
          label: 'Minnesota',
          value: 'MN'
        },
        {
          label: 'Mississippi',
          value: 'MS'
        },
        {
          label: 'Missouri',
          value: 'MO'
        },
        {
          label: 'Montana',
          value: 'MT'
        },
        {
          label: 'Nebraska',
          value: 'NE'
        },
        {
          label: 'Nevada',
          value: 'NV'
        },
        {
          label: 'New Hampshire',
          value: 'NH'
        },
        {
          label: 'New Jersey',
          value: 'NJ'
        },
        {
          label: 'New Mexico',
          value: 'NM'
        },
        {
          label: 'New York',
          value: 'NY'
        },
        {
          label: 'North Carolina',
          value: 'NC'
        },
        {
          label: 'North Dakota',
          value: 'ND'
        },
        {
          label: 'Northern Mariana Islands',
          value: 'MP'
        },
        {
          label: 'Ohio',
          value: 'OH'
        },
        {
          label: 'Oklahoma',
          value: 'OK'
        },
        {
          label: 'Oregon',
          value: 'OR'
        },
        {
          label: 'Palau',
          value: 'PW'
        },
        {
          label: 'Pennsylvania',
          value: 'PA'
        },
        {
          label: 'Puerto Rico',
          value: 'PR'
        },
        {
          label: 'Rhode Island',
          value: 'RI'
        },
        {
          label: 'South Carolina',
          value: 'SC'
        },
        {
          label: 'South Dakota',
          value: 'SD'
        },
        {
          label: 'Tennessee',
          value: 'TN'
        },
        {
          label: 'Texas',
          value: 'TX'
        },
        {
          label: 'Utah',
          value: 'UT'
        },
        {
          label: 'Vermont',
          value: 'VT'
        },
        {
          label: 'Virgin Islands',
          value: 'VI'
        },
        {
          label: 'Virginia',
          value: 'VA'
        },
        {
          label: 'Washington',
          value: 'WA'
        },
        {
          label: 'West Virginia',
          value: 'WV'
        },
        {
          label: 'Wisconsin',
          value: 'WI'
        },
        {
          label: 'Wyoming',
          value: 'WY'
        }
      ],
      security: '',
      complete: false,
      stripeOptions: {

      },
      token: null,
      charge: null
    }
  },
  methods: {
    pay () {
      this.saveBillingAddress()
      var self = this
      createToken().then(data => {
        self.handleStripeResponse(data)
      })
    },
    handleStripeResponse (data) {
      var self = this
      if (data.hasOwnProperty('error')) {
        self.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: data.error.message
        })
        return false
      } else {
        self.token = data.token
        var amt = (self.finishTotal) * 100
        amt = amt.toFixed(0)
        self.charge = {
          amount: amt,
          currency: 'usd',
          description: 'Payment Processed'
        }
        var respData = {}
        respData.charge = self.charge
        respData.data = data
        self.$emit('stripeResponseData', respData)
      }
    },
    changeToInfo () {
      this.$emit('changeToInfo')
    },
    saveBillingAddress () {
      var self = this
      var email = localStorage.getItem('email')
      var mobile = localStorage.getItem('mobile')
      var token = localStorage.getItem('token')
      var dataObj = {}
      var billingDataObj = {}
      if (email !== '' || mobile !== '' || token !== '') {
        if (this.paymentAddress === this.sameShippingAddress) {
          // call billing service and update billing address as shipping address
          dataObj.userBilling = {
            firstName: this.firstName,
            lastName: this.lastName,
            address1: this.address,
            address2: this.buildType,
            city: this.city,
            zip: this.zip,
            country: state.country,
            province: this.state
          }
          this.$common.timeline
            .callUserBilling(dataObj)
            .then(function (response) {
              var resp = response.data
              self.email = resp.email
              if (resp.hasOwnProperty('userBilling')) {
                self.firstName2 = resp.userBilling.firstName
                self.lastName2 = resp.userBilling.lastName
                self.address2 = resp.userBilling.address1
                self.buildType2 = resp.userBilling.address2
                self.city2 = resp.userBilling.city
                self.zip2 = resp.userBilling.zip
                self.state2 = resp.userBilling.province
              }
            })
            .catch(function () {
              // eslint-disable-next-line no-console
              console.log('error')
            })
        } else {
          // call billing service and update billing address as shipping address
          billingDataObj.userBilling = {
            firstName: this.firstName2,
            lastName: this.lastName2,
            address1: this.address2,
            address2: this.buildType2,
            city: this.city2,
            zip: this.zip2,
            country: state.country,
            province: this.state2
          }
          this.$common.timeline
            .callUserBilling(billingDataObj)
            .then(function (response) {
              var resp = response.data
              self.email = resp.email
              if (resp.hasOwnProperty('userBilling')) {
                self.firstName2 = resp.userBilling.firstName
                self.lastName2 = resp.userBilling.laseName
                self.address2 = resp.userBilling.address1
                self.buildType2 = resp.userBilling.address2
                self.city2 = resp.userBilling.city
                self.zip2 = resp.userBilling.zip
                self.state2 = resp.userBilling.province
              }
            })
            .catch(function () {
            })
        }
      }
    },
    changeToShippingMethod () {
      this.$emit('changeToShippingMethod')
    },
    submitStripe () {
    },
    checkoutPaypal () {
      var amount = this.total + this.delievery + this.tax
      amount = Number(amount.toFixed(2))
      var dataObj = {
        transactions: [
          {
            item_list: {
              items: []
            },
            amount: {
              currency: state.currency,
              total: amount
            },
            description: 'This is the payment description.'
          }
        ]
      }
      var i = 0
      Object.keys(this.cart).forEach(key => {
        if (i === 0) {
          let cartItem = this.cart[key]
          var itemObj = {
            name: cartItem.title,
            sku: cartItem.title,
            price: amount,
            currency: state.currency,
            quantity: cartItem.quantity
          }
          dataObj.transactions[0].item_list.items.push(itemObj)
        }
        i++
      })
      var self = this
      this.$common.timeline
        .callCheckoutPaypal(dataObj)
        .then(function (response) {
          if (response.success === true) {
            window.location = response.approvalURL
          } else {
            var err = response.error.response.message
            self.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: err
            })
            return false
          }
        })
        .catch((error) => {
          console.error(error)
          self.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Error occured'
          })
        })
    },
    validateForm () {
      this.$refs.paymentForm.validate().then(success => {
        if (success) {
          var self = this
          var email = localStorage.getItem('email')
          var mobile = localStorage.getItem('mobile')
          var token = localStorage.getItem('token')
          var dataObj = {}
          var billingDataObj = {}
          if (email !== '' || mobile !== '' || token !== '') {
            if (this.paymentAddress === this.sameShippingAddress) {
              // call billing service and update billing address as shipping address
              dataObj.userBilling = {
                firstName: this.firstName,
                lastName: this.lastName,
                address1: this.address,
                address2: this.buildType,
                city: this.city,
                zip: this.zip,
                country: state.country,
                province: this.state
              }
              this.$common.timeline
                .callUserBilling(dataObj)
                .then(function (response) {
                  var resp = response.data
                  self.email = resp.email
                  if (resp.hasOwnProperty('userBilling')) {
                    self.firstName2 = resp.userBilling.firstName
                    self.lastName2 = resp.userBilling.lastName
                    self.address2 = resp.userBilling.address1
                    self.buildType2 = resp.userBilling.address2
                    self.city2 = resp.userBilling.city
                    self.zip2 = resp.userBilling.zip
                    self.state2 = resp.userBilling.province
                  }
                })
                .catch((error) => {
                  console.error(error)
                })
            } else {
              // call billing service and update billing address as shipping address
              billingDataObj.userBilling = {
                firstName: this.firstName2,
                lastName: this.lastName2,
                address1: this.address2,
                address2: this.buildType2,
                city: this.city2,
                zip: this.zip2,
                country: state.country,
                province: this.state2
              }
              this.$common.timeline
                .callUserBilling(billingDataObj)
                .then(function (response) {
                  var resp = response.data
                  self.email = resp.email
                  if (resp.hasOwnProperty('userBilling')) {
                    self.firstName2 = resp.userBilling.firstName
                    self.lastName2 = resp.userBilling.laseName
                    self.address2 = resp.userBilling.address1
                    self.buildType2 = resp.userBilling.address2
                    self.city2 = resp.userBilling.city
                    self.zip2 = resp.userBilling.zip
                    self.state2 = resp.userBilling.province
                  }
                })
                .catch((error) => {
                  console.error(error)
                })
            }
          }
          /* Get shipping methods from service */
          this.$emit('makeStripePayment')
        }
      })
    },
    creditInfoChanged (values) {
      for (const key in values) {
        this[key] = values[key]
      }
    },
    setBillingAddress () {
      // Get shipping data from user service, for now using sample json data
      if (this.paymentAddress === this.differentShippingAddress) {
        var email = localStorage.getItem('email')
        var mobile = localStorage.getItem('mobile')
        var token = localStorage.getItem('token')
        if (email !== '' || mobile !== '' || token !== '') {
          var self = this
          this.$common.timeline.callUserInfo().then(function (response) {
            var resp = response.data
            if (resp.hasOwnProperty('userBilling')) {
              self.firstName2 = resp.userBilling.firstName
              self.lastName2 = resp.userBilling.lastName
              self.address2 = resp.userBilling.address1
              self.buildType2 = resp.userBilling.address2
              self.city2 = resp.userBilling.city
              self.state2 = resp.userBilling.province
              self.zip2 = resp.userBilling.zip
            }
          })
        }
      }
    }
  },
  watch: {
    paymentAddress: {
      handler: function (val, oldVal) {
        this.setBillingAddress()
      },
      deep: true
    }
  },
  computed: {
    finishTotal () {
      return this.total + this.delievery + this.tax
    },
    // validation expiration card
    cardExpiration: function () {
      if (!this.cardExpirationMonth || !this.cardExpirationYear) return ''

      return this.cardExpirationMonth + '/' + this.cardExpirationYear
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
.stripe-card {
  width: 100%;
    padding:12px;
}
.stripe-card.complete {
  border-color: transparent;
}
.cart-small-image {
  height: 4.5em;
  width: 4.5em;
  object-fit: contain;
  margin-right: 1em;
  border-radius: 4px;
}
.small-width {
  width: 50px;
}
.width-110 {
  width: 110px;
  /deep/.q-field--labeled .q-field__native {
    min-width: 35px;
  }
}
.card-number-width {
  width: 500px;
}
.expiration-width {
  width: 100px;
}
.center{
  text-align: center;
}
/deep/ .payment-form .q-field--with-bottom {
    padding-bottom: 0;
}
.card-item__type {
  }
.card-item__typeImg {
  width: 100%;
  padding: 4px;
  object-fit: contain;
  border-radius: 4px;
  width: 45px;
  height: 35px;
  position: relative;
}
</style>
