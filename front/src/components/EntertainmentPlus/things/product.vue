<template>
  <q-scroll-area class="fit sd-thing-wrapper">
    <!-- The product image(s) and slideshows -->
    <div class="carousel bg-white rounded-borders">
      <img class="image cursor-pointer thing-main-image" :src="imageList[0]" @click="index = 0" />
      <div class="center">
        <vue-gallery-slideshow :images="imageList" :index="index" @close="index = null" />
      </div>
    </div>
    <!-- The details -->
    <div class="q-mt-md text-h6 text-center">{{  thing.dataObject.name }}</div>
    <!-- Product variant section -->
    <!--
    <div class="self-start text-left">
      <div class="q-mb-md">
        <div style="max-width: 80px">
          <q-select dark v-model="size" :options="sizeOptions" label="Size"></q-select>
        </div>
      </div>
    </div>
    -->
    <!-- If there is a price -->
    <p v-if=" thing.dataObject.data.price" class="text-center">
      {{ $t("getItFor") }}
      <span class="text-weight-bold">${{ selectionPrice }}</span>
    </p>
    <!-- Add to cart or see more button -->
    <add-to-cart v-if="thing.dataObject.data.price" :thing="thing" @showCart="$emit('showCart')" />
    <q-btn v-else-if=" thing.dataObject.data.buttonRedirectUrl" no-caps color="primary" class="full-width q-px-xl" type="a" target="_blank"
      :href=" thing.dataObject.data.buttonRedirectUrl">{{ thing.dataObject.data.buttonText }}</q-btn>
    <!-- <vue-json-pretty :data="$common.products.shopifyDirect.toProcessor()" /> -->
    <!-- More Details -->
    <div class="q-mt-md text-white" v-if="thing.dataObject.data.description">
      <div class="text-h6 text-left">{{ $t("Details") }}</div>
      <div class="text-body1 q-mt-sm">
        <source-code :code="thing.dataObject.data.description"/>
      </div>
    </div>
  </q-scroll-area>
</template>
<script>
import AddToCart from 'components/EntertainmentPlus/things/product/addToCart'
import VueGallerySlideshow from 'vue-gallery-slideshow'
// import VueJsonPretty from 'vue-json-pretty'
export default {
  props: ['thing'],
  components: { VueGallerySlideshow, AddToCart },
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      viewInCart: false,
      loading: false,
      index: null,
      color: null,
      size: 'S',
      sizeOptions: [ 'S', 'M' ]
    }
  },
  async mounted () {
    // Check if this is a v1 product or higher...
    if (this.thing.mapped) {
      this.debug('Getting productV2 details...')
      // Get the product information fresh...
    }
    this.debug('Showing details for ', this.thing)
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
      /*
      var variantArr = this.thing.dataObject.data.direct_checkout_variant
      variantArr = variantArr.replace('#', '')
      variantArr = JSON.parse(variantArr)
      let priceVal = this.getPriceOfSize(variantArr)
      */
      return this.thing.dataObject.data.price
    }
  }
}
</script>
<style lang="stylus" scoped>
  .thing-main-image
    object-fit cover !important
    top 0
    width 100%
    height 100%
  .carousel
    height 15em
    transition all 0.3s
    overflow hidden
  .scroll
    overflow scroll
  .carousel img
    width 100%
    height 100%
    object-fit contain
    transition all 0.3s
  .info-card
    padding: 0em
    margin: 0em
    background-color rgba(0, 255, 0, 1)
  .center .vgs
    display flex
    flex-direction column
    justify-content center
</style>
