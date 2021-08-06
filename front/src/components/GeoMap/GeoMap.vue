<template>
    <div>
      <GmapMap
        :center="{lat, lng}"
        :zoom="12"
        style="width: 500px; height: 300px"
      >
        <GmapMarker
          :position="{lat, lng}"
          :clickable="true"
          :draggable="true"
          @click="center=position"
        />
      </GmapMap>
    </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'geo-map',
  props: ['lat', 'lng'],
  data () {
    return {
    }
  },
  computed: {
    google: gmapApi
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 500px;
  width: 100%;
  margin: 0 auto;
}
</style>
