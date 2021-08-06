<template>
  <div class="fit q-pl-md">
    <q-scroll-area style="height: 460px; max-width: 450px;">
    <div class="row no-wrap ">
      <q-card class="my-card q-mt-sm" flat>
        <q-card-section>
          <div class="row no-wrap q-mx-sm">
            <div class="col-6">

                <q-img
                  contain
                  class="q-pa-sm"
                  :src="thing.dataObject.data.galleryLogo"
                />
            </div>
            <div class="col">

            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="my-card q-px-xs">
      <q-card class="q-my-sm" style="background-color: rgb(255, 255, 255, 1.0)" flat>
        <q-tabs
          v-model="tab"
          class="text-grey-8"
          active-color="red-9"
          indicator-color="red-9"
          align="justify"
          narrow-indicator
        >
          <q-tab name="gallery" label="Gallery" />
          <q-tab name="stories" label="Stories" />
          <q-tab name="shop" label="Exclusives" />
        </q-tabs>

        <q-separator />
      </q-card>

        <q-tab-panels
          v-model="tab"
          class=" q-ma-xs rounded-borders "
          animated
        >
          <q-tab-panel class="q-pa-xs" name="gallery">
            <q-card flat>
            <q-card-section class="col q-pt-xs">
              <div class="">
               <q-carousel
                  v-model="slide"
                  arrows
                  ratio=16/9
                  height="270px"
                  navigation
                  infinite
                >
                  <q-carousel-slide :name="1" img-src="https://www.pollstar.com/Image/Photos/f2b0a613-8097-4e92-9656-2d44241ca79c-06.20.2019_-_Billie_Eilish_-_Washington,_DC-53.jpg" />
                  <q-carousel-slide :name="2" img-src="https://metro.co.uk/wp-content/uploads/2019/09/GettyImages-1174917184.jpg" />
                  <q-carousel-slide :name="3" img-src="https://variancemagazine.com/images/billie-eilish-variance-cr-dan-deslover-19432.jpg" />
                  <q-carousel-slide :name="4" img-src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2019%2F09%2Fbillie-eilish-where-do-we-go-2020-world-tour-dates-001.jpg?q=75&w=800&cbr=1&fit=max" />
                </q-carousel>
              </div>
            </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="stories" class="q-pa-xs">
            <q-card flat>
            <q-card-section class="col q-pt-xs">
              <div class="q-pa-xs row items-start q-gutter-xs">
                <q-card class="my-card" flat bordered>
                  <q-card-section>
                    <div class="row no-wrap">
                      <q-avatar size="24px" class="q-mr-sm" square>
                        <img src="https://www.rollingstone.com/wp-content/uploads/2018/07/RS_Monogram_3000px-copy-e1530547673203.png">
                      </q-avatar>
                      <div class="text-overline text-red-8">Music News</div>
                    </div>

                      <div class="text-subtitle1 text-grey-10 text-bold q-mt-sm q-mb-xs">Forget Brass and Bombast: Billie Eilish’s Understated Bond Theme Is a Song You Need to Know</div>
                  </q-card-section>
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                      <div class="text-caption text-grey">
                        Is “No Time to Die” a soundtrack for exploding cars and sharks with lasers on their heads? Hell no

                      </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                      <q-img
                        class="rounded-borders"
                        src="data:image/jpeg;base64,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"
                      />
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions class="justify-around">
                    <q-btn flat color="grey-8">
                      Read Now
                    </q-btn>
                    <q-btn flat color="red-8">
                      Save for Later
                    </q-btn>
                  </q-card-actions>
                </q-card>
                <q-card class="my-card" flat bordered>
                  <q-card-section>
                    <div class="row no-wrap">
                      <q-avatar size="24px" class="q-mr-sm" square>
                        <img src="https://www.rollingstone.com/wp-content/uploads/2018/07/RS_Monogram_3000px-copy-e1530547673203.png">
                      </q-avatar>
                      <div class="text-overline text-red-8">Music News</div>
                    </div>

                      <div class="text-subtitle1 text-grey-10 text-bold q-mt-sm q-mb-xs">Billie Eilish Wins Big at 2020 Grammy Awards</div>
                  </q-card-section>
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                      <div class="text-caption text-grey">
                        Pop star sweeps big four awards: Best New Artist, Album, and Record and Song of the Year
                      </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                      <q-img
                        class="rounded-borders"
                        src="data:image/jpeg;base64,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"
                      />
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions class="justify-around">
                    <q-btn flat color="grey-8">
                      Read Now
                    </q-btn>
                    <q-btn flat color="red-8">
                      Save for Later
                    </q-btn>
                  </q-card-actions>
                </q-card>
                <q-card class="my-card" flat bordered>
                  <q-card-section>
                    <div class="row no-wrap">
                      <q-avatar size="24px" class="q-mr-sm" square>
                        <img src="https://www.rollingstone.com/wp-content/uploads/2018/07/RS_Monogram_3000px-copy-e1530547673203.png">
                      </q-avatar>
                      <div class="text-overline text-red-8">Music News</div>
                    </div>

                      <div class="text-subtitle1 text-grey-10 text-bold q-mt-sm q-mb-xs">Billie Eilish Talks ‘No Time to Die,’ Being Sick at Oscars: ‘I Bombed That Performance’</div>
                  </q-card-section>
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                      <div class="text-caption text-grey">
                        ‘We wrote it in three days,’ she tells Apple Music of initially penning the James Bond theme song
                      </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                      <q-img
                        class="rounded-borders"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdaZFCAdzdRyV1PzYIKSgxMSr-ryIqXBDPE3yv7DlN_F_VdJNT21eSxJDkD48mXSfsIQxEWQ&usqp=CAI&s"
                      />
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions class="justify-around">
                    <q-btn flat color="grey-8">
                      Read Now
                    </q-btn>
                    <q-btn flat color="red-8">
                      Save for Later
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="shop" class="q-pa-xs">
            <q-card flat>
            <q-card-section class="col q-pt-xs">
              <div class="">
               <q-carousel
                  v-model="offer"
                  contain
                  ratio=16/9
                  height="245px"
                  autoplay="true"
                  infinite
                >
                  <q-carousel-slide :name="1" img-src="https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/2fba1f60-fc6a-406b-860a-315903bbca89.png" />
                  <q-carousel-slide :name="2" img-src="https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/fbc9a850-635d-4f74-afab-8f2c963959ac.png" />
                </q-carousel>
              </div>
            </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>

    </div>
    <div class="row">
      <q-card dark class="advertCard q-mx-sm" flat>
        <div class="row no-wrap">
          <div class="col">
            <div class="row">
              <q-img
                contain
                class="rounded-borders"
                @click="alert = true"
                src="https://www.barclayscenter.com/assets/img/BC_1920_EV_Billie_Eilish_AnnounceAssets_910x350-b6c646ccb0.jpg"
              >
              </q-img>
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <q-dialog class="fit" v-model="alert">
      <q-card >
        <q-card-section
          style="min-height: 450px; max-height: 50vh"
          class="scroll"
        >Exclusive Sponsored Offer
          <iframe
            style="min-width:300px; width:100%; min-height: 700px;"
            src="https://www.ticketmaster.com/billie-eilish-tickets/artist/2257710"
          ></iframe>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="red-8" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-scroll-area>
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
      slide: 1,
      offer: 1,
      accept: false,
      tab: 'gallery',
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
