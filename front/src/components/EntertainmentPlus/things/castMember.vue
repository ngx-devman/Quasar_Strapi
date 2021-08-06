<template>
  <div class="fit q-pl-md">
    <div class="row no-wrap q-ma-sm">
      <q-avatar rounded>
        <img :src="thing.dataObject.data.teamLogo" />
      </q-avatar>
      <div class="q-mt-md q-ml-sm text-h6 text-center">
        {{ thing.dataObject.data.playerTeam }}
      </div>
    </div>
    <div>
      <q-card class="my-card q-mt-md" flat bordered>
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
            class="full-width"
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

        <q-separator />

        <q-card-actions>
          <q-btn class="text-grey-8" flat round icon="av_timer">{{
            thing.dataObject.data.onIceTime
          }}</q-btn>
          <q-btn class="text-grey-8" flat icon="timeline">
            {{ thing.dataObject.data.avgHeartRate }}
          </q-btn>
          <q-btn class="text-grey-8" flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-scroll-area
      v-if="thing.dataObject.data.playerPosition == 'Goalie'"
      style="height: 350px; max-width: 450px;"
    >
      <div class="q-pa-sm q-pt-lg row items-start q-gutter-md">
        <q-card class="my-card text-grey-8">
          I'm a Goalie
        </q-card>
      </div>
    </q-scroll-area>
    <q-scroll-area v-else style="height: 350px; max-width: 450px;">
      <div class="q-pa-sm q-pt-lg row items-start q-gutter-md">
        <q-card class="my-card text-grey-8">
          <q-card-section>
            Ice Time
          </q-card-section>
          <q-card-section>
            <div class="text-caption text-grey">
              {{ thing.dataObject.data.maxSpeed }}
            </div>
            <q-linear-progress :value="progress" class="q-mt-md" />
          </q-card-section>
        </q-card>
        <q-card class="my-card text-grey-8">
          <q-card-section>
            <div class="text-caption text-grey">
              {{ thing.dataObject.data.maxSpeed }}
            </div>
            <q-linear-progress :value="progress" class="q-mt-md" />
          </q-card-section>
        </q-card>
        <q-card class="my-card text-grey-8">
          <q-card-section>
            <div class="text-caption text-grey">
              {{ thing.dataObject.data.maxSpeed }}
            </div>
            <q-linear-progress :value="progress" class="q-mt-md" />
          </q-card-section>
        </q-card>
        <q-card class="my-card text-grey-8">
          <q-card-section>
            <div class="text-caption text-grey">
              {{ thing.dataObject.data.maxSpeed }}
            </div>
            <q-linear-progress :value="progress" class="q-mt-md" />
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  props: ['thing'],
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      viewInCart: false,
      loading: false,
      bioExpanded: false,
      index: null,
      color: null,
      progress: ' thing.dataObject.data.maxSpeed',
      size: 'S',
      sizeOptions: ['S', 'M']
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
</style>
