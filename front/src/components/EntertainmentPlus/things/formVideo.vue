<template>
  <div class="fit bg-black" style="overflow-y: auto;">
    <div class="q-mx-xs">
      <div class="row q-my-xs">
        <div class="col-3 q-px-xs">
          <img
            class="q-ma-md rounded-borders"
            style="max-width: 120px;"
            :src="thing.dataObject.data.brandLogo"
          />
        </div>
        <div class="col-11 q-mx-md">
          <q-btn
            style="min-width:320px;"
            class="fit"
            type="a"
            :href="thing.dataObject.data.buttonRedirectUrl"
            target="_blank"
            :label="thing.dataObject.data.buttonText"
            :color="thing.dataObject.data.buttonColor"
          />
        </div>
      </div>
      <div>
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
            <q-card dark class="q-mx-sm q-my-lg q-pa-sm text-grey-5">
               <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    <q-toggle dark v-model="fluSymptoms" label="I currently have fever, sore throat" />
    <q-toggle dark v-model="travelPast30" label="I have traveled in the past 30 days" />
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        dark
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        dark
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-input
        filled
        type="email"
        v-model="email"
        label="Your email address"
        lazy-rules
        dark
        :rules="[
          val => val !== null && val !== '' || 'Please type your email'
        ]"
      />

      <q-toggle dark v-model="accept" label="I accept the CDC privacy terms" />

      <div>
        <q-btn label="Submit" type="submit" :color="thing.dataObject.data.buttonColor"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
     </q-card>
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
      sizeOptions: ['S', 'M'],
      name: null,
      age: null,
      email: null,
      accept: false,
      fluSymptoms: false,
      travelPast30: false
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
          message: 'Thank you for sharing to protect your fellow citizens'

        })
      }
      this.name = null
      this.age = null
      this.email = null
      this.accept = false
      this.fluSymptoms = false
      this.travelPast30 = false
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
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
