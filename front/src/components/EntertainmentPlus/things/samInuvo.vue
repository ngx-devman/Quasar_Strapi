<template>
  <div class="fit bg-black" style="overflow-y: auto;">
    <div class="q-mx-xs">
      <div v-if="thing.dataObject.data.brandLogo != null" class="row q-my-xs">
        <div class="col-3 q-px-xs">
          <img
            class="q-ma-md"
            style="max-width: 120px;"
            :src="thing.dataObject.data.brandLogo"
          />
        </div>
        <div class="col-11 q-mx-md">
        <!--  <q-btn
            style="min-width:320px;"
            class="fit"
            type="a"
            :href="thing.dataObject.data.buttonRedirectUrl"
            target="_blank"
            :label="thing.dataObject.data.buttonText"
            :color="thing.dataObject.data.buttonColor"
          /> -->
        </div>
      </div>
      <div v-if="thing.dataObject.data.videoUrl != null">
        <q-card dark class="my-card q-mt-md text-grey-8">
            <div class="q-pa-xs">
              <q-video
                :ratio="16 / 9"
                :src="thing.dataObject.data.videoUrl"
              />
            </div>
          </q-card>
      </div>
    </div>
          <div class="fit">
          <iframe
            class="fit"
            :src="thing.dataObject.data.embedUrl"
            style="width:100%;height:75%"
            frameborder="0"
            @load="loaded = true"
          ></iframe>
        </div>
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
      descriptionExpanded: false,
      mapExpanded: false,
      index: null,
      fixed: true,
      loaded: false,
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
  components: {},
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
  },
  myclick () {

  }
}
</script>

<style lang="stylus" scoped>

</style>
