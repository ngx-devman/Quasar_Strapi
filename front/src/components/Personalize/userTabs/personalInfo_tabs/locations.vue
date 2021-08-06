<template>
  <q-card-section>
    <q-tabs
      v-model="tab_locations"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <q-tab name="home" label="Home"></q-tab>
      <q-tab name="work" label="Work"></q-tab>
    </q-tabs>

    <q-separator></q-separator>

    <q-tab-panels v-model="tab_locations" animated>
      <q-tab-panel name="home">
        <div>
          <p>
            Please, add your
            <b>home</b> address:
          </p>
          <div class="row q-mb-md">
            <gmap-autocomplete>
              <template v-slot:input="slotProps">
                <q-input
                  outlined
                  prepend-inner-icon="place"
                  placeholder="Location Of Event"
                  ref="input"
                  v-on:listeners="slotProps.listeners"
                  v-on:attrs="slotProps.attrs"
                ></q-input>
              </template>
            </gmap-autocomplete>

            <q-btn @click="addMarker" color="primary" class="q-ml-md" label="Add" />
          </div>
        </div>

        <!-- <div>
          <p>lat {{center.lat}}</p>
          <p>lng {{center.lng}}</p>
        </div>-->

        <gmap-map :center="center" :zoom="12" style="width: 100%;  height: 400px;">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
      </q-tab-panel>

      <q-tab-panel name="work">
        <div>
          <p>
            Please, add your
            <b>work</b> address:
          </p>
          <div class="row q-mb-md">
            <gmap-autocomplete>
              <template v-slot:input="slotProps">
                <q-input
                  outlined
                  prepend-inner-icon="place"
                  placeholder="Location Of Event"
                  ref="input"
                  v-on:listeners="slotProps.listeners"
                  v-on:attrs="slotProps.attrs"
                ></q-input>
              </template>
            </gmap-autocomplete>

            <q-btn @click="addMarker" color="primary" class="q-ml-md" label="Add" />
          </div>
        </div>

        <gmap-map :center="center" :zoom="12" style="width: 100%;  height: 400px;">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  name: 'locations',
  props: [],
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      // places: [],
      // currentPlace: null,
      tab_locations: 'home'
    }
  },
  mounted () {
    // this.geolocate()
  },
  methods: {
    // setPlace (place) {
    //   this.currentPlace = place
    // }
    addMarker () {
    //   if (this.currentPlace) {
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng()
    //     }
    //     this.markers.push({ position: marker })
    //     this.places.push(this.currentPlace)
    //     this.center = marker
    //     this.currentPlace = null
    //   }
    }
    // geolocate: function () {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     }
    //   })
    // }
  },
  computed: {
    google: gmapApi
  }
}
</script>
