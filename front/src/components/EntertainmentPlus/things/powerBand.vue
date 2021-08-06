<template>
  <div class="bg-white fit">
    <div class="row items-center no-wrap">
      <!-- <q-btn flat color="black" icon="close" /> -->
      <q-btn flat color="black" icon="arrow_back" />
      <div class="col-8 q-px-sm row justify-center">
        <q-avatar>
          <q-img
            src="https://lh3.googleusercontent.com/proxy/TM6ymoc1gF8YoegDuQhEsgxEgRvKENrBRG39NPXmYjWqBe9gTfi1uV3-qqya7Ler3QbngMk8S2g1P6PsvdiOLevCuEltx-wvJRqMFGogpgMefoa9_zCxqlZP0FcmYiLz_SesSQ"
          />
        </q-avatar>
      </div>
    </div>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey q-mt-md"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      no-caps
    >
      <q-tab name="local_listing" label="Local Listing"></q-tab>

      <q-tab name="refine_listing" label="Refine Listing"></q-tab>

      <q-tab name="financing" label="Financing"></q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="text-black">
      <q-tab-panel name="local_listing">
        <local-listing />
      </q-tab-panel>

      <q-tab-panel name="refine_listing">
        <refine-listing />
      </q-tab-panel>

      <q-tab-panel name="financing">
        <financing />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import localListing from './powerband/localListing'
import refineListing from './powerband/refineListing'
import financing from './powerband/financing'
export default {
  components: {
    localListing,
    refineListing,
    financing
  },
  data () {
    return {
      tab: 'local_listing'
    }
  }
}
</script>
