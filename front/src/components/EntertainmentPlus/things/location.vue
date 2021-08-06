<template>
  <div class="q-ma-xs" style="max-width; 400px;">
     <q-dialog position="standard" full-height full-width v-model="fixed">
      <q-card>
        <q-card-actions align="top">
          <q-btn flat icon="close" color="Black" v-close-popup />
          <q-btn flat color="primary" type="a"
            :href="thing.dataObject.data.buttonRedirectUrl"
            target="_blank"
            @click='linkClick'>
            <div>
              Visit {{thing.dataObject.data.buttonText}} directly
            </div>
          </q-btn>
        </q-card-actions>
        <q-card-section>
              <iframe
        class="fit"
        frameBorder="0"
        :src="thing.dataObject.data.buttonRedirectUrl"
        style="width:100%;height:75%;"
        @load="loaded = true"
      ></iframe>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-card dark class="q-ma-xs">
      <q-card-section class="q-pa-sm">
          <img
            class="rounded-borders"
            style="max-width: 100%;"
            :ratio="16 / 9"
            :src="thing.dataObject.data.image"
          />
      </q-card-section>
      <q-card-section>
        <div class="text-h5 text-weight-bolder text-white text-uppercase q-ml-sm">
            {{ thing.dataObject.data.name }}
          </div>
            <div v-if="thing.dataObject.data.locationSubtitle == true" class="text-white text-h6 q-ma-xs q-ml-md">
            {{ thing.dataObject.data.subtitle }}
          </div>
          <div v-else />
          <div v-if="thing.dataObject.data.externalRedirect == true">
                <q-btn
            v-if="thing.dataObject.data.buttonColorOverride == true"
            :style="cssVars"
            class="fit text-weight-bolder q-my-sm"
            type="a"
            :href="thing.dataObject.data.buttonRedirectUrl"
            target="_blank"
            :label="thing.dataObject.data.buttonText"
            @click='linkClick'
          />
          <q-btn
            v-else
            style="min-width:320px;"
            class="fit text-weight-bolder"
            type="a"
            :href="thing.dataObject.data.buttonRedirectUrl"
            target="_blank"
            :label="thing.dataObject.data.buttonText"
            color="primary"
            @click='linkClick'
          />
            </div>
            <div v-else>
              <q-btn
            v-if="thing.dataObject.data.buttonColorOverride == true"
            :style="cssVars"
            class="fit text-weight-bolder q-my-sm"
            @click="linkClick(true)"
            :label="thing.dataObject.data.buttonText"
          />
          <q-btn
            v-else
            style="min-width:320px;"
            class="fit text-weight-bolder"
            @click="linkClick(true)"
            :label="thing.dataObject.data.buttonText"
            color="primary"
          />
            </div>

      </q-card-section>
    </q-card>
    <q-card dark class="q-ma-xs q-my-sm">
      <q-card-section>
        <div class="col-12 q-mt-xs">

     <!--     <q-expansion-item
          class="full-width"
          v-model="descriptionExpanded"
          dark
          dense
          :caption="thing.dataObject.data.descriptionCTA"
        > -->
          <div class="text-h6 text-white q-pb-md q-px-xs">
                  {{ thing.dataObject.data.description }}
                </div>
    <!--    </q-expansion-item> -->
        </div>
      </q-card-section>
    </q-card>
    <div v-if="thing.dataObject.data.showMapCard == true" >
    <q-card dark class="q-ma-xs q-my-sm">
      <q-card-section>
        <q-expansion-item
          class="full-width"
          v-model="mapExpanded"
          dark
          dense
          :caption="thing.dataObject.data.mapCTA"
        >
          <div class="carousel rounded-borders q-mt-md">
            <geo-map :lat="thing.dataObject.data.location.lat" :lng="thing.dataObject.data.location.long"/>
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>
    </div>
    <div v-else />
  </div>
</template>
<script>
import GeoMap from '../../GeoMap/GeoMap'
export default {
  props: ['thing'],
  components: {
    GeoMap
  },
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      viewInCart: false,
      loading: false,
      descriptionExpanded: true,
      mapExpanded: false,
      index: null,
      loaded: false,
      fixed: false,
      color: null,
      progress: ' thing.dataObject.data.maxSpeed',
      size: 'S',
      sizeOptions: ['S', 'M']
    }
  },
  mounted () {
    this.loaded = true
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
    },
    linkClick (e) {
      this.$analytics(this.$common.constants.events.action, this.thing.id)
      this.$pulse('activationAction', { id: this.thing.id })
      if (e) this.fixed = true
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
    },
    cssVars () {
      return {
        'background-color': this.thing.dataObject.data.buttonColor,
        'color': this.thing.dataObject.data.buttonTextColor
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.red-btn {
  background-image: linear-gradient(to right, #cb2d3e 0%, #ef473a 51%, #cb2d3e 100%)
}

.carousel {
  height: 18em;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s;
}
.carousel img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s;
}
.info-card {
  padding: 0.7em;
  color: black;
}
.center .vgs {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
