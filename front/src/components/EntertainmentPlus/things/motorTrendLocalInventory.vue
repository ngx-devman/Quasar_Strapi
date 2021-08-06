<template>
  <div class="fit q-pl-md">
    <div class="row no-wrap ">
      <q-card dark class="my-card bg-black q-mt-sm" flat>
        <q-card-section>
          <div class="row no-wrap q-mx-sm">
            <div class="col-2">
              <q-avatar class="" rounded>
                <q-img
                  contain
                  class="q-pa-sm"
                  :src="thing.dataObject.data.vehicleDealershipLogo"
                />
              </q-avatar>
            </div>
            <div class="col">
              <div class="q-mt-sm text-h6 text-left">
                {{ thing.dataObject.data.vehicleDealership }}
              </div>
            </div>
            <div class="col-2"></div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="my-card q-px-xs">
      <q-card dark class="q-my-sm q-mx-xs" flat>
        <q-tabs
          v-model="tab"
          dense
          dark
          class="text-white"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="vehicle" label="Vehicle" />
          <q-tab name="financing" label="Financing" />
          <q-tab name="chat" label="Buy Now" />
        </q-tabs>

        <q-separator />
      </q-card>

      <q-scroll-area style="height: 450px; max-width: 450px;">
        <q-tab-panels
          v-model="tab"
          class="bg-grey-10 q-ma-xs rounded-borders "
          animated
        >
          <q-tab-panel class="q-pa-sm" name="vehicle">
            <q-card-section class="col q-pt-xs">
              <div class="row justify-between">
                <div class="text-h6 text-white">
                  {{ thing.dataObject.data.vehicleDisplayTitle }}
                </div>
                <div class="text-overline text-white q-mr-xs">
                  Price: {{ thing.dataObject.data.vehiclePrice }}
                </div>
                <q-expansion-item
                  class="full-width"
                  v-model="statsExpanded"
                  dense
                  dark
                  dense-toggle
                  caption="Specs"
                >
                  <div class="row no-wrap q-mb-sm justify-around">
                    <div class="col">
                      <div class="row">
                        <div class="col-12 text-center">
                          Mileage:
                        </div>
                        <div class="col-12 text-center">
                          {{ thing.dataObject.data.vehicleMileage }}
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="row">
                        <div class="col-12 text-center">
                          Condition:
                        </div>
                        <div class="col-12 text-center">
                          {{ thing.dataObject.data.vehicleCondition }}
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="row">
                        <div class="col-12 text-center">
                          MPG:
                        </div>
                        <div class="col-12 text-center">
                          {{ thing.dataObject.data.vehicleMPG }}
                        </div>
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
                <q-expansion-item
                  class="full-width"
                  v-model="descriptionExpanded"
                  dense
                  dark
                  dense-toggle
                  caption="Description"
                >
                  <div class="text-caption text-grey-3">
                    {{ thing.dataObject.data.vehicleDescription }}
                  </div>
                </q-expansion-item>
              </div>
            </q-card-section>

            <div class="col-4 flex flex-center">
              <q-img
                class="rounded-borders shadow-up-11 q-mx-sm q-mb-sm q-px-md"
                :src="thing.dataObject.data.vehicleMainImage"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="financing" class="q-py-sm">
            <q-card dark flat class="my-card q-mx-sm">
              <q-card-section>
                <q-expansion-item
                  class="full-width"
                  v-model="ratesExpanded"
                  dark
                  dense-toggle
                  caption="Current Rates"
                >
                  <div class="row no-wrap justify-around">
                    <div class="col">
                      <div class="row">
                        <div class="col-12 text-center">
                          Poor Credit:
                        </div>
                        <div class="col-12 text-center">
                          {{ ratesLow }}
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="row">
                        <div class="col-12 text-center">
                          Good Credit:
                        </div>
                        <div class="col-12 text-center">
                          {{ ratesMid }}
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="row">
                        <div class="col-12 text-center">
                          Excellent Credit:
                        </div>
                        <div class="col-12 text-center">
                          {{ ratesHigh }}
                        </div>
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
                <q-card-section> </q-card-section>
              </q-card-section>
            </q-card>
            <q-card dark flat class="my-card q-ma-sm">
              <q-card-section>
                <div class="text-overland">
                  Find out your rate below
                </div>
              </q-card-section>
              <q-card-section>
                <div class="q-px-md" style="max-width: 400px">
                  <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    dark
                    class="q-gutter-xs"
                  >
                    <q-input
                      filled
                      v-model="name"
                      dark
                      label="Your name *"
                      hint="Name and surname"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />

                    <q-input
                      filled
                      dark
                      type="number"
                      v-model="age"
                      label="Your age *"
                      lazy-rules
                      :rules="[
                        val =>
                          (val !== null && val !== '') ||
                          'Please type your age',
                        val =>
                          (val > 0 && val < 100) || 'Please type a real age'
                      ]"
                    />

                    <q-toggle
                      v-model="accept"
                      label="I accept the terms and conditions"
                    />

                    <div>
                      <q-btn label="Submit" type="submit" color="primary" />
                      <q-btn
                        label="Reset"
                        type="reset"
                        color="primary"
                        flat
                        class="q-ml-sm"
                      />
                    </div>
                  </q-form>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="chat">
            <div class="fit">
              <div class="row q-py-xs q-mx-sm">
                <div class="col"></div>
                <div class="col">
                  <q-btn
                    push
                    dense
                    class=""
                    label="Schedule a Test drive"
                    icon="timeline"
                  />
                </div>
              </div>
              <div class="row q-px-xs justify-center">
                <div style="width: 100%; max-width: 400px">
                  <q-chat-message
                    name="Real Time Viewer"
                    avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                    :text="[
                      `Hi, Is this Mustang still available? And.. Do you have finacing available?`
                    ]"
                    text-color="white"
                    bg-color="primary"
                  />
                  <q-chat-message
                    name="Sales Advisor - Jane"
                    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                    :text="[
                      `Hi Real Time, The Mustang is still available. Would you like me to send the invite to your ContentWallet?`
                    ]"
                    stamp="7 minutes ago"
                    sent
                    bg-color="green-5"
                  />
                  <q-chat-message
                    name="Real Time Viewer"
                    avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                    :text="[
                      `That would be great. What is the best deal you can give me?`
                    ]"
                    text-color="white"
                    bg-color="primary"
                  />
                  <q-chat-message
                    name="Sales Advisor - Jane"
                    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                    text-color="white"
                    bg-color="green-5"
                    sent
                  >
                    <q-spinner-dots size="2rem" />
                  </q-chat-message>

                  <div class="q-mt-lg">
                    <q-input dark standout v-model="text" :dense="dense">
                      <template v-slot:append>
                        <q-icon name="flight_takeoff" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </div>
    <div class="row">
      <q-card dark class="advertCard q-mt-lg q-mx-md" flat>
        <div class="row no-wrap">
          <div class="col">
            <div class="row">
              <q-img
                contain
                class="q-pa-xs"
                @click="alert = true"
                src="https://microcdn.jiffylube.com/images/homepage/lwb_4.jpg"
              >
              </q-img>
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section
          style="min-width: 400px; max-height: 50vh"
          class="scroll"
        >
          <iframe
            style="width:100%; min-height: 600px;"
            src="https://www.lubeninja.com/promo/cisa-2019/?utm_source=jiffylube&utm_medium=email&utm_campaign=cisa-dtc-oct2019"
          ></iframe>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ['thing'],
  components: {},
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      viewInCart: false,
      loading: false,
      alert: false,
      name: '',
      age: '',
      accept: false,
      tab: 'vehicle',
      descriptionExpanded: false,
      statsExpanded: true,
      ratesLow: '13.6% APR',
      ratesMid: '6.25% APR',
      ratesHigh: '3.125% APR',
      ratesExpanded: false,
      breakdownExpanded: false,
      bannerAdvert: 'https://microcdn.jiffylube.com/images/homepage/lwb_4.jpg',
      index: null,
      color: null,
      progress: ' thing.dataObject.data.maxSpeed',
      size: 'S',
      sizeOptions: ['S', 'M'],
      GeoSeries: [
        {
          name: 'Qtr 1',
          data: [44, 55, 41, 37, 22, 43, 21]
        },
        {
          name: 'Qtr 2',
          data: [53, 32, 33, 52, 13, 43, 32]
        },
        {
          name: 'Qtr 3',
          data: [12, 17, 11, 9, 15, 11, 20]
        },
        {
          name: 'Qtr 4',
          data: [9, 7, 5, 8, 6, 9, 4]
        }
      ],
      GeoChartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: ''
        },
        theme: {
          mode: 'light',
          palette: 'palette2'
        },
        xaxis: {
          categories: [
            'Min Played',
            'Points',
            'Assists',
            'Rebounds',
            'Steals',
            'Blocks',
            'Fouls'
          ],
          labels: {
            formatter: function (val) {
              return val + 'K'
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + 'K'
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'views',
          align: 'center',
          label: 'Views',
          field: 'views',
          sortable: true
        },
        {
          name: 'interactions',
          label: 'Interactions',
          field: 'interactions',
          sortable: true
        },
        { name: 'grabs', label: 'Grabs', field: 'grabs' },
        { name: 'shares', label: 'Shares', field: 'shares' },
        {
          name: 'OtherDistributions',
          label: 'Shared w/ Distributions',
          field: 'OtherDistributions'
        }
      ]
    }
  },
  mounted () {
    this.$emit('loaded')
  },
  methods: {
    closeButton () {
      this.$emit('cancel')

      // play event
      this.$emit('CloseBtnStopVideo')
    },
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Thank you our team will be reaching out shortly'
        })
      }
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    },
    getPriceOfSize (variantArr) {
      var variantPrice = 0
      if (variantArr.length > 0) {
        if (this.size !== '' && this.size !== null) {
          var sizeVal = this.size.toLowerCase().trim()
        }
        Object.keys(variantArr).forEach(key => {
          let variantItem = variantArr[key]
          if (variantItem.title === sizeVal) {
            variantPrice = variantItem.price
          }
        })
      }
      return variantPrice
    }
  },
  computed: {
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '5px'
      }
    },
    // The list of all the images associated with this product...
    imageList () {
      return this.thing.dataObject.media.map(item => item.url)
    },
    selectionPrice () {
      var variantArr = this.thing.dataObject.data.direct_checkout_variant
      variantArr = variantArr.replace('#', '')
      variantArr = JSON.parse(variantArr)
      let priceVal = this.getPriceOfSize(variantArr)
      return priceVal
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width: 100%
  max-width: 450px

.advertCard
  width: 100%
  max-width: 450px
</style>
