<template>
    <div class="fit">
      <div class="fit q-pb-md" v-if="thing.dataObject.data.embedUrl != null">
        <iframe
          class="fit"
          :src="thing.dataObject.data.embedUrl"
          style="width:100%;height:100%"
          frameborder="0"
          @load="loaded = true"
        ></iframe>
        </div>
      <div v-else class="text-white text-center text-h5">
        <error-message :text="$t('errors.missingURL')" />
      </div>
    </div>
</template>

<script>
import errorMessage from 'components/EntertainmentPlus/things/errorMessage'
export default {
  props: ['thing'],
  components: {
    errorMessage
  },
  data () {
    return {
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

<style lang="stylus" scoped></style>
