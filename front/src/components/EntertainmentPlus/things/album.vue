<template>
  <div v-if="loading" style="overflow-y: auto;">
    <q-card dark>
    <img
      class="rounded-borders"
      style="max-height-: 200px; "
      :ratio="16 / 9"
      contain
      :src="thing.settings.details.album.mainImage"
    />
    </q-card>
    <q-card dark class="q-my-xs">
      <q-card-section>
        <div class="col-12 q-mt-xs">
          <q-btn
            style="min-width:320px;"
            class="fit"
            type="a"
            :href="thing.settings.details.handler.redirectUrl"
            target="_blank"
            :label="thing.settings.details.handler.text"
            :color="thing.settings.details.handler.color"
            @click="$analytics($common.constants.events.action)"
          />
          <div class="text-h6 text-white text-uppercase q-mt-sm">
            {{ thing.settings.details.album.name }}
          </div>
          <div class="text-white q-ma-xs">
            {{ thing.settings.details.album.subtitle }}
          </div>
          <q-expansion-item
          class="full-width"
          v-model="descriptionExpanded"
          dark
          dense
          :caption="thing.settings.details.album.descriptionCTA"
        >
          <div class="text-caption text-white q-mx-md">
            {{ thing.settings.details.album.description }}
          </div>
        </q-expansion-item>
        </div>
      </q-card-section>
    </q-card>

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
      color: null,
      progress: '5',
      size: 'S',
      sizeOptions: ['S', 'M']
    }
  },
  mounted () {
    this.$emit('loaded')
    this.loading = true
  },
  components: {

  },
  methods: {
    closeButton () {
      this.$emit('cancel')

      // play event
      this.$emit('CloseBtnStopVideo')
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
      return this.thing.settings.details.album.images(image => image.url)
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
