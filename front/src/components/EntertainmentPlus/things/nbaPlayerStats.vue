<template>
  <div class="fit q-pl-md">
    <div class="row no-wrap ">
      <q-avatar class="q-pa-sm q-px-sm" rounded>
        <img
        class="q-pt-xs"
        :src="thing.dataObject.data.teamLogo" />
      </q-avatar>
      <div class="q-mt-md q-ml-sm text-h6 text-center">
        {{ thing.dataObject.data.playerTeam }}
      </div>
    </div>
    <div>
      <q-card dark class="my-card q-my-md" flat bordered>
        <q-card-section class="col q-pt-sm">
          <div class="row no-wrap justify-between">
            <div class="text-overline text-white q-mr-xs">
              Position: {{ thing.dataObject.data.playerPosition }}
            </div>
            <div class="text-h6 text-white">
              #{{ thing.dataObject.data.playerNumber }}
            </div>
          </div>
        </q-card-section>
        <q-card-section horizontal>
          <div class="col q-pt-none q-mx-md">
            <div class="text-h5 text-white q-mb-xs">
              {{ thing.dataObject.data.playerName }}
            </div>
            <q-expansion-item
              class="full-width"
              v-model="bioExpanded"
              dense
              dark
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
              class="rounded-borders q-ma-sm q-pa-md"
              :src="thing.dataObject.data.playerMainImage"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-scroll-area
      v-if="thing.dataObject.data.playerPosition == 'Coach'"
      style="height: 450px; max-width: 450px;"
    >
      <div class="q-pa-sm q-pt-lg row items-start q-gutter-md">
        <q-card class="my-card text-white">
          I'm a Coach
        </q-card>
      </div>
    </q-scroll-area>
    <q-scroll-area v-else style="height: 450px; max-width: 450px;">
     <q-card dark class="q-my-sm q-py-xs">
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
        <q-tab name="gameStats" label="Game" />
        <q-tab name="historicalStats" label="Career" />
        <q-tab name="advanced" label="Advanced" />
      </q-tabs>

      <q-separator />
</q-card>
      <q-tab-panels v-model="tab" class="bg-grey-10 rounded-borders" animated>
        <q-tab-panel name="gameStats">
                    <q-expansion-item
                class="full-width"
                v-model="breakdownExpanded"
                dense
                dark
                dense-toggle
                caption="Breakdown"
              >
              <div class="text-caption text-white">
                  <q-card flat class="q-pa-lg">

                  </q-card>
                </div>
              </q-expansion-item>
          <q-expansion-item
                class="full-width"
                v-model="statsExpanded"
                dense
                dark
                dense-toggle
                caption="Details"
              >
            <div class="q-pt-sm row">
            <q-card dark class="full-width text-white rounded-borders q-ma-xs q-pa-sm">
              <div class="q-ml-md text-subtitle1">Live Stats</div>
              <q-card-section>
                <div class="row no-wrap fit q-gutter-s">
                  <div class="col">
                    <div class="row">
                      <div class="col-12">Min Played</div>
                      <div class="col-10 q-mx-lg">15</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-10 center-self">Points</div>
                      <div class="col-10 center-self">15</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-10 center-self">Assists</div>
                      <div class="col-10 center-self">15</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-10 center-self">Rebounds</div>
                      <div class="col-10 center-self">15</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row no-wrap fit q-gutter-md">
                  <div class="col">
                    <div class="row">
                      <div class="col-10 center-self">Steals</div>
                      <div class="col-10 center-self">15</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-10 center-self">Blocks</div>
                      <div class="col-10 center-self">15</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-10 center-self">Fouls</div>
                      <div class="col-10 center-self">15</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-10 center-self">Turnovers</div>
                      <div class="col-10 center-self">15</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          </q-expansion-item>
        </q-tab-panel>

        <q-tab-panel name="historicalStats">
          <div class="q-pt-lg row items-start q-gutter-md">
            <div class="text-caption text-grey">
                  <q-card flat class="q-pa-lg">

                  </q-card>
                </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="advanced">
          <div class="q-pt-lg row items-start q-gutter-md"></div>
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </div>
</template>

<script>

export default {
  props: ['thing'],
  components: {
  },
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      viewInCart: false,
      loading: false,
      tab: 'gameStats',
      bioExpanded: false,
      statsExpanded: true,
      breakdownExpanded: false,
      index: null,
      color: null,
      progress: ' thing.dataObject.data.maxSpeed',
      size: 'S',
      sizeOptions: ['S', 'M']

    }
  },
  methods: {
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
  mounted () {
    this.$emit('loaded')
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
</style>
