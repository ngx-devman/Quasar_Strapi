<template>
  <div class="fit scroll">
    <!-- The product image(s) and slideshows -->
    <div class="carousel bg-white rounded-borders">
      <sd-img :url="image" @click="index = 0" />
      <div class="center">
        <vue-gallery-slideshow :images="imageList" :index="index" @close="index = null" />
      </div>
    </div>
    <div class='column fit'>
      <div class='sticky col-grow'>
        <!-- The title -->
        <div class="q-mt-md text-subtitle1 text-center">{{ product.title }}</div>
        <!-- The price -->
        <p v-if="price" class="text-center getItFor">
          <span v-if="priceCompare" class="text-weight-bold text-strike">${{ priceCompare }}</span>
          {{ $t("getItFor") }}
          <span class="text-weight-bold">${{ price }}</span>
        </p>
        <!-- Add to cart or see more button -->
        <add-to-cart class=' index-9 q-pb-sm' v-if="variant" :thing='thing' :variant="variant" @showCart="$emit('showCart')" :storefront="thing.dataObject.data.externalCatalogId" />
        <div v-else>
          <q-btn no-caps color="grey" class="full-width">
            This Combination isn't available
          </q-btn>
        </div>
      </div>
      <div class='col scroll'>
        <!-- Product variant section - Only show if the product has more than one option -->
        <div v-if="product && product.variants && product.variants.length > 1">
          <div v-for="(option, index) in product.options" :key="index" class="q-pb-md">
            <div class="q-gutter-md row">
              <q-select class="col" v-model="selection[option.name]" bg-color="grey" outlined
              @input="matchVariant(option.name, $event)" :options="option.values" :label="option.name"
              />
            </div>
          </div>
        </div>
        <!-- <vue-json-pretty :data="$common.products.shopifyDirect.toProcessor()" /> -->

        <!-- Description -->
        <div class="q-mt-md text-white" v-if="product.description">
          <div class="text-body1 q-my-sm" v-html="product.description">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddToCart from 'components/EntertainmentPlus/things/product/addToCartV2'
import VueGallerySlideshow from 'vue-gallery-slideshow'
// import VueJsonPretty from 'vue-json-pretty'
export default {
  props: ['thing'],
  components: { VueGallerySlideshow, AddToCart },
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      // Product options selected...
      selection: {},
      product: {},
      variant: null,
      loaded: false,
      index: null
    }
  },
  async mounted () {
    this.debug('Getting product details...', this.thing)
    // Get the product information fresh...
    const detail = await this.$common.products.details(this.thing)
    const variants = detail.variants.map(variant => {
      return {
        id: variant.id,
        title: detail.title,
        subtitle: variant.title,
        priceCompare: variant.compareAtPrice,
        price: variant.price,
        image: variant.image.src,
        available: variant.available,
        weight: variant.weight,
        sku: variant.sku,
        options: variant.selectedOptions.map(option => ({ name: option.name, value: option.value }))
      }
    })
    this.product = {
      price: detail.price,
      media: detail.images,
      available: detail.availableForSale,
      description: detail.descriptionHtml,
      title: detail.title,
      options: detail.options.map(option => {
        // Pull out only each values value (type/etc is not used)...
        const values = option.values.map(value => value.value)
        return { name: option.name, values: values, selected: null }
      }),
      variants
    }
    // Set the initial selected options to the first variant...
    this.product.variants[0].options.forEach(option => {
      this.$set(this.selection, option.name, option.value)
    })
    this.matchVariant()
    this.loaded = true
    this.$emit('loaded')
  },
  methods: {
    // A variant option was just selected...
    matchVariant () {
      // See if it exists...
      let selected = null
      // Go through each variant...
      this.product.variants.forEach(variant => {
        // Go through each option in this variant and see if it's selected...
        let match = true
        variant.options.forEach(option => {
          // console.log('matching', this.selection)
          if (this.selection[option.name] !== option.value) match = false
        })
        if (match) selected = variant
      })
      this.variant = selected
    },
    closeButton () {
      this.$emit('cancel')
      // play event
      this.$emit('CloseBtnStopVideo')
    }
  },
  computed: {
    // The list of all the images associated with this product...
    imageList () {
      return this.product.media ? this.product.media.map(item => item.src) : []
    },
    // The image is either the first image, or the variant image...
    image () {
      return this.variant ? this.variant.image : this.imageList[0]
    },
    price () {
      return this.variant ? this.variant.price : false
    },
    priceCompare () {
      return this.variant ? this.variant.priceCompare : false
    }
  }
}
</script>
<style lang="stylus" scoped>
  .carousel
    height 15em
    transition all 0.3s
    overflow hidden
  .carousel img
    width 100%
    height 100%
    object-fit contain
    transition all 0.3s
  .center .vgs
    display flex
    flex-direction column
    justify-content center
  .sticky
    position sticky
    top 0px
// *Re-enable when needed
@media (min-width: 2560px)
  /deep/.q-btn__wrapper
    padding 14px 0
    font-size 2.5em
  /deep/.vgs__close
    font-size 5em
    widows auto
    height auto
</style>
