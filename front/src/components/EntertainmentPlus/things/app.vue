<template>
  <div class="fit rounded-borders">
    <q-scroll-area style="height: 100vh; max-width: 100%">
      <div class="col-3 q-px-xs">
        <!-- Logo -->
        <template>
          <div class="col-3 q-px-xs">
            <img
              class="q-ma-md"
              style="max-width: 120px"
              v-if="thing.settings.details.app.logo"
              :src="thing.settings.details.app.logo"
            />
          </div>
          <div class="col-11 q-ml-md q-mb-md q-mx-md">
            <div class="text-h5 text-white q-mx-sm">
              <span v-if="thing.settings.details.app.slogan">{{ thing.settings.details.app.slogan }}</span>
            </div>
          </div>
        </template>
        <!-- Image -->
        <template>
          <div
            v-if="thing.settings.details.app.mainImage"
            class="q-mx-md q-pt-sm row q-gutter-sm"
          >
            <q-card dark class="full-width q-mt-md text-grey-8">
              <div class="q-pa-xs">
                <q-img
                  :ratio="16 / 9"
                  contain
                  :src="thing.settings.details.app.mainImage"
                />
              </div>
            </q-card>
          </div>
        </template>
        <!-- Details -->
        <template>
          <div class="text-h5 text-white q-mx-sm q-my-md">
            {{ thing.settings.details.app.name }}
          </div>
          <div class="text-h6 text-white q-mx-sm q-mb-md">
            <source-code
              v-if="thing.settings.details.app.bio"
              :bandi="false"
              :code="thing.settings.details.app.bio"
            />
            <source-code
              v-else
              :bandi="false"
              :code="thing.settings.details.app.description"
            />
          </div>
        </template>
        <!-- Song -->
        <template v-if="type === 'music'">
          <div class="q-px-lg">
            <div>
              <q-btn
                unelevated
                rounded
                label="Play"
                class="q-mb-md full-width"
                style="background-color: #1FD660; color: white"
                size="lg"
              ></q-btn>
            </div>

            <div>
              <q-btn
                unelevated
                rounded
                label="Follow"
                class="q-mb-md full-width"
                style="border: 3px solid white; color: white"
                size="lg"
              ></q-btn>
            </div>

            <div>
              <q-btn
                unelevated
                rounded
                label="Purchase"
                class="full-width gradient"
                style="color: white"
                size="lg"
              ></q-btn>
            </div>
          </div>
        </template>
        <!-- Handler -->
        <template v-if="handler">
          <q-btn
            v-if="$behavior.exists('openLinksInFrames', thing)"
            class="fit text-weight-bolder"
            :class="handler.class"
            :label="handler.text"
            :style="{
              ...handler.style,
              color: handler.color ? handler.color : 'red'
            }"
            href="handler.redirectUrl"
            flat target="_blank"
            @click="$analytics($common.constants.events.action)"
          />
        </template>
        <!-- Donation -->
        <PayPalDonation v-if="thing.settings.details.donation && !!thing.settings.details.donation.allow" :thing="thing"/>
        <!-- Video -->
        <template>
          <div v-if="thing.settings.details.app.mainVideo">
            <q-card dark class="q-mt-md text-grey-8">
              <div class="q-pa-xs">
                <q-responsive style="max-height: 100vh" :ratio="16 / 9">
                  <video v-if="videoCheck.source === 'html5'" id='sdVideoB' controls playsinline :poster='thing.settings.details.app.mainImage' :src='thing.settings.details.app.mainVideo' type='video/mp4'/>
                  <div class="plyr__video-embed" v-else-if='videoCheck.source === "youtube"'>
                    <iframe
                      :src="`https://www.youtube.com/embed/${videoCheck.id}?iv_load_policy=3&playsinline=1&modestbranding=1&showinfo=0&rel=0&enablejsapi=1`"
                      allowfullscreen
                      allowtransparency
                      allow="autoplay"
                    ></iframe>
                  </div>
                  <div class="plyr__video-embed" v-else-if='videoCheck.source === "vimeo"'>
                    <iframe
                      :src="`https://player.vimeo.com/video/${videoCheck.id}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`"
                      allowfullscreen
                      allowtransparency
                      allow="autoplay"
                    ></iframe>
                  </div>
                </q-responsive>
              </div>
            </q-card>
          </div>
        </template>
        <!-- Embeds -->
        <template v-if="thing.settings.details.app.embed">
          <div class="fit q-my-md">
            <iframe
              :src="thing.settings.details.app.embed"
              class="fit frame"
              @load="loaded = true"
              width="100%"
              height="500px"
              style="height: 500px !important; border: 0"
            />
          </div>
        </template>
        <!-- Custom Components -->
        <!-- Powerband -->
        <template v-if="type === 'powerband'">
          <div class="q-mt-md">
            <q-tabs
              v-model="powerband.tabs"
              dense
              clss="text-grey"
              active-color="primary"
              align="justify"
              no-caps
              narrow-indicator
            >
              <q-tab name="local_listing" label="Local Listing"></q-tab>
              <q-tab name="refine_listing" label="Refine Listing"></q-tab>
              <q-tab name="financing" label="Financing"></q-tab>
            </q-tabs>
            <q-tab-panels v-model="powerband.tabs" animated class="text-black">
              <q-tab-panel name="local_listing"><local-listing /></q-tab-panel>
              <q-tab-panel name="refine_listing"
                ><refine-listing
              /></q-tab-panel>
              <q-tab-panel name="financing"><financing /></q-tab-panel>
            </q-tab-panels>
          </div>
        </template>
        <!-- MAP -->
        <template v-if="type === 'map'">
          <q-card dark class="q-ma-xs q-my-sm">
            <q-card-section>
              <q-expansion-item
                class="full-width"
                v-model="map.expended"
                dark
                dense
                :caption="'Caption'"
              >
                <div class="carousel rounded-borders q-mt-md">
                  <geo-map
                    :lng="thing.settings.details.location.lng"
                    :lat="thing.settings.details.location.lat"
                  />
                </div>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </template>
        <!-- MotorTrend -->
        <template v-if="type === 'motortrend'">
          <MotorTrendLocal />
        </template>
      </div>
    </q-scroll-area>
  </div>
</template>
<script>
// Source Code
import SourceCode from '../../sourceCode'

// PowerBand
import LocalListing from './powerband/localListing'
import RefineListing from './powerband/refineListing'
import Financing from './powerband/financing'

// Location
import GeoMap from '../../GeoMap/GeoMap'

// Paypal Donation
import PayPalDonation from './paypalDonations'

// MotorTrend
import MotorTrendLocal from './motorTrendLocalInventory'

export default {
  name: 'appThing',
  props: ['thing'],
  components: {
    SourceCode,
    LocalListing,
    RefineListing,
    Financing,
    GeoMap,
    PayPalDonation,
    MotorTrendLocal
  },
  data () {
    return {
      powerband: {
        tabs: ''
      },
      map: {
        expended: false
      }
    }
  },
  computed: {
    videoCheck () {
      let yt = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      const vimeo = /^(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/
      if (this.thing.settings.details.app.mainVideo.match(yt)) return { source: 'youtube', id: this.thing.settings.details.app.mainVideo.match(yt)[1] }
      else if (this.thing.settings.details.app.mainVideo.match(vimeo)) return { source: 'vimeo', id: this.thing.settings.details.app.mainVideo.match(vimeo)[1] }
      else return { source: 'html5', id: this.thing.settings.details.app.mainVideo }
    },
    type () {
      return this.thing.settings.details.app.is
    },
    handler () {
      if (
        this.thing.settings.details.handler &&
        this.thing.settings.details.handler.display &&
        this.thing.settings.details.handler.text
      ) { return this.thing.settings.details.handler } else return undefined
    },
    images () {
      return this.thing.settings.details.app.images.map(image => image.url)
    },
    videos () {
      return this.thing.settings.details.app.videos.map(video => video.url)
    },
    audios () {
      return this.thing.settings.details.app.audio.map(audio => audio.url)
    },
    videoB () {
      return document.getElementById('sdVideoB')
    }
  },
  mounted () {
    this.$emit('loaded')
  }
}
</script>
<style lang="stylus" scoped></style>
