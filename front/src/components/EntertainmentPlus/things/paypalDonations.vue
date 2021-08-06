<template>
  <div id='paypalDonations' class="fit text-black q-pb-md">
    <q-card class='fit scroll'>
      <div v-if="!paidFor" class='row q-mx-md'>
        <div class='col-12 column flex-center'>
          <q-img contain width='80%' :ratio="16/9" :src="logo"/>
          <div class="text-center text-subtitle1 text-bold">
            Donate to Crew Nation
          </div>
          <div class="text-center text-subtitle1 q-my-md">
            Purpose: Donations processed and administered via Music Forward Foundation
          </div>
        </div>
          <div class='column no-wrap col-12' style='max-width: 330px !important;margin: 0 auto'>
            <div class="row fit no-wrap q-mt-xs justify-center">
              <div v-for='(price,index) in priceAmounts' :key='index' class='q-mx-sm'>
                <q-btn v-if='price.type === "btn"' unelevated :class='selected ===index ? "text-white" : "text-blue-8"' class="q-px-md borderOutline" size='0.7rem' :color='selected === index ? "blue-8" : "white"' @click='checkoutPrice(price,index)'>
                  <div class='column'>
                    {{'$' + price.amount}}
                    <div>USD</div>
                  </div>
                </q-btn>
              </div>
            </div>
            <div class='fit'>
              <q-input @click='checkoutPrice(inputPrice,4)' outlined prefix="$" class="text-bold q-my-md" placeholder='0.00' v-model="inputPrice" label="Other Amount" />
            </div>
          </div>
        <div class='col-12 column flex-center' ref="paypal" @click="$analytics($common.constants.events.action)"></div>
      </div>

      <div v-if="paidFor">
      <div class="row">
        <div class="col">
           <div class="row">

        <div class="col">
          <q-img
            class="q-mx-xl"
            contain
            width="80%"
            :ratio="16/9"
            src="https://hobmusicforward.org/wp-content/uploads/2020/03/2020-LN-Crew-Nation-Logo-RGB.2.png"
          />
        </div>
      </div>
          <div class="row q-mx-md">
            <div class="col text-h6 text-center">
              Thank you for your support of Crew Nation
            </div>
          </div>
          <div class="row">
            <div class="col text-center q-ma-md text-weight-bold">
             <span class="text-red-7 text-weight-bolder"> Music Forward Foundation</span> is a 501c3 Not For Profit Organization
            </div>
          </div>
          <div class="row no-wrap q-mx-lg">
            <div class="col text-center text-weight-bolder">
              All donations are tax-deductible
                   </div>

          </div>
          <div class="row">
            <div class="col text-center q-ma-md text-weight-bold">
            <span>Tax ID:</span><span class="text-red-7"> 47-4907184</span>
          </div>
          </div>

        </div>
      </div>
</div>
    </q-card>
  </div>
</template>

<script>
// import image from "../assets/lamp.png"
export default {
  props: ['thing'],
  name: 'paypalDonations',
  debug: {
    context: 'Paypal'
  },
  data: function () {
    return {
      selectedPrice: 0,
      loaded: false,
      paidFor: false,
      selected: null,
      product: {
        description: 'Select your donation amount',
        img: './assets/lamp.jpg'
      },
      priceAmounts: [
        { amount: 25.00, type: 'btn' }, { amount: 100.00, type: 'btn' }, { amount: 500.00, type: 'btn' }
      ],
      inputPrice: '',
      logo: 'https://hobmusicforward.org/wp-content/uploads/2020/03/2020-LN-Crew-Nation-Logo-RGB.2.png'
    }
  },
  mounted: function () {
    const script = document.createElement('script')
    script.src =
      `https://www.paypal.com/sdk/js?client-id=${this.thing.settings.details.donation.clientId}`
    script.addEventListener('load', this.setLoaded)
    document.body.appendChild(script)
    this.$emit('loaded')
  },
  methods: {
    setLoaded: function () {
      this.loaded = true
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: 'USD',
                    value: this.selectedPrice
                  }
                }
              ]
            })
          },
          onApprove: async (data, actions) => {
            // this.data
            this.paidFor = true
          },
          onError: err => {
            // eslint-disable-next-line no-console
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
    },
    // Sets price for selectedPrice and index of selected
    checkoutPrice (price, index) {
      this.$pulse('activationAction', { id: this.thing.id })
      // Sets selected item
      this.selected = index
      price.amount ? this.selectedPrice = price.amount : this.selectedPrice = price
    }
  },
  watch: {
    'inputPrice' (v) {
      this.selectedPrice = v
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.borderOutline
  border-style solid
  border-width 1px
/deep/.q-btn__content
  font-size 15px!important
  line-height 1.3rem
@media (max-width: 360px)
  /deep/.q-btn__wrapper
    padding 4px 12px!important
</style>
