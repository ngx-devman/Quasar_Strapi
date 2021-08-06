  <template>
  <q-page
    fit
    class=""
  >
    <div class="row">
      <div class="col">
        <div class="row no-wrap q-ma-sm">
          <q-avatar rounded>
            <img :src="thing.dataObject.data.teamLogo" />
          </q-avatar>
          <div class="q-mt-md q-ml-sm text-h6 text-center">
            {{ thing.dataObject.data.playerTeam }}
          </div>
        </div>
        <div class="row justify-start q-ma-sm">
          <q-card
            class="my-card q-mt-md"
            flat
            bordered
          >
            <q-card-section class="col q-pt-sm">
              <div class="row no-wrap justify-between">
                <div class="text-overline text-grey-8">
                  Position: {{ thing.dataObject.data.playerPosition }}
                </div>
                <div class="text-h6 text-grey-8">
                  #{{ thing.dataObject.data.playerNumber }}
                </div>
              </div>
            </q-card-section>
            <q-card-section horizontal>
              <div class="col q-pt-none q-mx-md">
                <div class="text-h5 text-grey-8 q-mb-xs">
                  {{ thing.dataObject.data.playerName }}
                </div>
                <q-expansion-item
                  class="full-width q-pb-md"
                  v-model="bioExpanded"
                  dense
                  dense-toggle
                  caption="BIO"
                >
                  <div class="text-caption text-grey">
                    {{ thing.dataObject.data.playerBio }}
                  </div>
                </q-expansion-item>
              </div>
              <div class="col-4 flex flex-center">
                <q-img
                  class="rounded-borders"
                  :src="thing.dataObject.data.playerMainImage"
                />
              </div>
            </q-card-section>

          </q-card>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row">
          <q-card
            dark
            class="q-mb-md bg-black q-mx-md"
          >
            <div class="q-mx-xl q-px-xl">
              <q-tabs
                v-model="tab"
                animated
                flat
                class=" text-grey-4 bg-black justify-around primary"
                :active-color="thing.dataObject.data.teamColor"
                indicator-color="white"
                align="justify"
              >
                <q-tab
                  name="stats"
                  label="Stats"
                />
                <q-tab
                  name="news"
                  label="News"
                />
                <q-tab
                  name="fans"
                  label="Fan Page"
                />
              </q-tabs>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-card
              dark
              flat
              style="max-width: 440px;"
              class="q-mb-md q-mx-md"
            >
              <q-tab-panels
                v-model="tab"
                animated
                flat
              >
                <q-tab-panel
                  class="q-pa-sm bg-black"
                  style="background-color: rgb(0,0,0,0.9);"
                  name="stats"
                >
                  <q-scroll-area
                    v-if="thing.dataObject.data.playerPosition == 'Goalie'"
                    style="height: 550px; max-width: 450px;"
                    class="bg-black"
                  >
                    <div class="q-pa-sm row items-center q-gutter-md">
                      <q-card
                        dark
                        class="my-card bg-black q-pa-md text-grey-8"
                      >
                        <div class="row no-wrap text-grey-2 text-weight-bold text-subtitle1">
                          <div class="col">1st Period</div>
                        </div>

                        <div class="row q-mb-xs">
                          <div class="col-12">

                            <q-separator
                              dark
                              inset
                            />
                          </div>
                        </div>

                        <q-card
                          dark
                          class="row q-pa-xs bg-black justify-around"
                        >
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Shots: </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.firstPeriodShots}}</div>
                            </div>
                          </div>
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Saves: </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.firstPeriodSaves}}</div>
                            </div>
                          </div>
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Save Pct. </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.firstPeriodSavePct}}%</div>
                            </div>
                          </div>
                        </q-card>

                      </q-card>
                      <q-card
                        dark
                        class="my-card bg-black q-pa-md text-grey-8"
                      >
                        <div class="row no-wrap text-grey-2 text-weight-bold text-subtitle1">
                          <div class="col">2nd Period</div>
                        </div>

                        <div class="row q-mb-xs">
                          <div class="col-12">

                            <q-separator
                              dark
                              inset
                            />
                          </div>
                        </div>

                        <q-card
                          dark
                          class="row q-pa-xs bg-black justify-around"
                        >
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Shots: </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.secondPeriodShots}}</div>
                            </div>
                          </div>
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Saves: </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.secondPeriodSaves}}</div>
                            </div>
                          </div>
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Save Pct. </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.secondPeriodSavePct}}%</div>
                            </div>
                          </div>
                        </q-card>

                      </q-card>
                      <q-card
                        dark
                        class="my-card bg-black q-pa-md text-grey-8"
                      >
                        <div class="row no-wrap text-grey-2 text-weight-bold text-subtitle1">
                          <div class="col">3rd Period</div>
                        </div>

                        <div class="row q-mb-xs">
                          <div class="col-12">

                            <q-separator
                              dark
                              inset
                            />
                          </div>
                        </div>

                        <q-card
                          dark
                          class="row q-pa-xs bg-black justify-around"
                        >
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Shots: </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.thirdPeriodShots}}</div>
                            </div>
                          </div>
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Saves: </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.thirdPeriodSaves}}</div>
                            </div>
                          </div>
                          <div class="col text-subtitle2">
                            <div class="row no-wrap">
                              <div class="col-7 text-grey-2 text-weight-bold">Save Pct. </div>
                              <div class="col-5 text-grey-2 text-weight-bold justify-around">{{thing.dataObject.data.thirdPeriodSavePct}}%</div>
                            </div>
                          </div>
                        </q-card>

                      </q-card>

                    </div>
                  </q-scroll-area>
                  <q-scroll-area
                    v-else
                    style="height: 350px; max-width: 450px;"
                  >
                    <div class="q-pa-sm q-pt-lg row items-start q-gutter-md">

                      <q-card class="my-card text-grey-8">
                        <q-card-section>
                          <div class="text-caption text-grey">
                            {{ thing.dataObject.data.maxSpeed }}
                          </div>
                          <q-linear-progress
                            :value="progress"
                            class="q-mt-md"
                          />
                        </q-card-section>
                      </q-card>
                      <q-card class="my-card text-grey-8">
                        <q-card-section>
                          <div class="text-caption text-grey">
                            {{ thing.dataObject.data.maxSpeed }}
                          </div>
                          <q-linear-progress
                            :value="progress"
                            class="q-mt-md"
                          />
                        </q-card-section>
                      </q-card>
                      <q-card class="my-card text-grey-8">
                        <q-card-section>
                          <div class="text-caption text-grey">
                            {{ thing.dataObject.data.maxSpeed }}
                          </div>
                          <q-linear-progress
                            :value="progress"
                            class="q-mt-md"
                          />
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-scroll-area>

                </q-tab-panel>

                <q-tab-panel
                  class="q-pa-sm"
                  style="background-color: rgb(0,0,0,0.9);"
                  name="news"
                >
                  <q-scroll-area
                    v-if="thing.dataObject.data.playerPosition == 'Goalie'"
                    style="height: 250px; max-width: 450px;"
                  >

                  </q-scroll-area>
                  <q-scroll-area
                    v-else
                    style="height: 350px; max-width: 450px;"
                  >

                  </q-scroll-area>
                </q-tab-panel>

                <q-tab-panel
                  class="q-pa-sm bg-black"
                  style=""
                  name="fans"
                >
                  <div class="row bg-grey-10 rounded-borders glossy text-grey-5 q-mx-md">
                    <div class="col">
                      <q-btn
                        label="Chat with other fans"
                        icon="chat"
                        @click="chat"
                      />
                    </div>
                  </div>

                  <div class="row bg-grey-10 rounded-borders glossy text-grey-5 q-mx-md">
                    <div class="col">
                      <q-card class="q-pa-sm q-ma-sm">
                        <div class="">{{this.$common.timeUntil(ISOdate,false)}}</div>
                    </q-card>
                    </div>
                  </div>

                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  props: ['thing'],
  components: { },
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      viewInCart: false,
      loading: false,
      date: '2020-04-22 10:10:12 UTC',
      bioExpanded: false,
      index: null,
      color: null,
      messages: [],
      chatMessage: '',
      value: 0,
      tab: 'stats',
      progress: 'thing.dataObject.data.maxSpeed',
      size: 'S',
      sizeOptions: ['S', 'M'],
      options: {},
      series: [44, 55, 65, 22, 0, 22],
      periodOneSeries: [{
        data: [0, 2, 1, 0, 0, 3, 6, 1, 1, 0, 4, 1, 1, 5, 2, 1, 1, 1, 1, 2]
      }],
      chartOptions: {
        chart: {
          sparkline: {
            enabled: true
          }
        },

        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.6
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value
            }
          }
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return value + ' Minutes'
            }
          }
        },
        colors: ['#DCE6EC']

      }
    }
  },
  mouted () {
    this.$emit('loaded')
  },
  methods: {
    chat () {
      this.$event.emit('toggleChat')
      this.$analytics(this.$common.constants.events.action, this.thing.id)
    },
    closeButton () {
      this.$emit('cancel')

      // play event
      this.$emit('CloseBtnStopVideo')
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
    firstPeriodStats () {
      const name = 'Shots'
      const data = this.thing.dataObject.data.firstPeriodStats.split(',')
      return [{ name, data }]
    },
    secondPeriodStats () {
      const name = 'Shots'
      const data = this.thing.dataObject.data.secondPeriodStats.split(',')
      return [{ name, data }]
    },
    thirdPeriodStats () {
      const name = 'Shots'
      const data = this.thing.dataObject.data.thirdPeriodStats.split(',')
      return [{ name, data }]
    },
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
  .my-card {
    width: 100%;
    max-width: 450px;
  }
</style>
