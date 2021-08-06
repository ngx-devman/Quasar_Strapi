<template>
  <div
    class="fit rounded-borders"
    style="overflow-y: none;"
  >
    <div class="q-mx-xs">
      <div class="row q-my-xs">
        <div class="col-3 q-px-xs">
          <img
            class="q-ma-md"
            style="max-width: 120px;"
            :src="thing.dataObject.data.brandLogo"
          />
        </div>
        <div v-if="thing.dataObject.data.brandSlogan" class="col-11 q-ml-md q-mb-md  q-mx-md">
           <div class="text-h5 text-white q-mx-sm">
                {{ thing.dataObject.data.subtitle }}
              </div>
        </div>
        <div v-else />

        <div v-if="thing.dataObject.data.buttonRedirectUrl" class="col-11 q-ml-lg q-mx-md q-mb-sm">
          <q-btn
            :style='thing.dataObject.data.buttonColorOverride ? cssVars : ""'
            class='fit text-weight-bolder'
            :class='thing.dataObject.data.buttonColorOverride ? "q-my-xs": ""'
            @click='linkClick(thing.dataObject.data.buttonRedirectUrl)'
            :label="thing.dataObject.data.buttonText"
          />
        </div>
      </div>
    </div>
    <q-scroll-area
      class="q-mt-s"
      style="height: 750px;"
    >
      <div v-if="thing.dataObject.data.brandVideo" class="q-mx-md q-pt-sm row q-gutter-sm">
        <q-card
          dark
          class="my-card q-mt-md text-grey-8"
        >
          <div class="q-pa-xs">
            <q-responsive style='max-height:100vh' :ratio='16/9' @click='videoToggle'>
              <div class='play absolute-full flex flex-center desktop-only' v-if='overlayDisplay'><q-icon name='play_circle_outline' color='white'/></div>
              <video v-if="videoCheck.source === 'html5'" id='sdVideoB' controls playsinline :poster='thing.dataObject.data.brandLogo' :src='thing.dataObject.data.brandVideoUrl' type='video/mp4'/>
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
      <div v-else />
      <div v-if="thing.dataObject.data.brandImage" class="q-mx-md q-pt-sm row q-gutter-sm">
        <q-card
          dark
          :style="cardCssVars"
          class="my-card q-mt-md text-grey-8"
        >
          <div class="q-pa-xs">
            <q-img
              :ratio="16 / 9"
              contain
              :src="thing.dataObject.data.brandImageUrl"
            />
          </div>
        </q-card>
      </div>
      <div v-else />
      <div class="q-mx-md col">
        <q-card
          dark
          class="my-card q-mx-xs q-mt-sm"
          flat
        >
          <q-card-section class="col q-pt-xs">
            <div class="row no-wrap justify-between"></div>
          </q-card-section>
          <q-card-section horizontal>
            <div class="col q-mx-xs">
          <!--    <div class="text-h5 text-white q-mx-md">
                {{ thing.dataObject.data.subtitle }}
              </div>  -->
         <!--     <q-expansion-item
                class="full-width q-my-sm"
                v-model="descriptionExpanded"
                dark
                dense

              > -->
                <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
                  <source-code :code="thing.dataObject.data.description" :bandi="true"/>

                </div>
           <!--   </q-expansion-item> -->
            </div>
          </q-card-section>
        </q-card>
      </div>

    </q-scroll-area>

  </div>
</template>

<script>
export default {
  props: ['thing'],
  data () { return { overlayDisplay: this.$q.platform.is.ios } },
  mounted () { this.$emit('loaded') },
  methods: {
    videoToggle () {
      if (this.overlayDisplay) this.overlayDisplay = false
    },
    linkClick (link) {
      this.$pulse('activationAction', { id: this.thing.id })
      this.$analytics(this.$common.constants.events.action, this.thing.id)
      if (this.$behavior.exists('openLinksInFrames', this.thing)) this.$emit('linkDialog', this.thing.dataObject.data.buttonRedirectUrl)
      else window.open(link, '_blank')
    }
  },
  computed: {
    videoCheck () {
      let yt = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      const vimeo = /^(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/
      if (this.thing.dataObject.data.brandVideoUrl.match(yt)) return { source: 'youtube', id: this.thing.dataObject.data.brandVideoUrl.match(yt)[1] }
      else if (this.thing.dataObject.data.brandVideoUrl.match(vimeo)) return { source: 'vimeo', id: this.thing.dataObject.data.brandVideoUrl.match(vimeo)[1] }
      else return { source: 'html5', id: this.thing.dataObject.data.brandVideoUrl }
    },
    videoB () {
      return document.getElementById('sdVideoB')
    },
    cssVars () {
      return {
        'background-color': this.thing.dataObject.data.buttonColor,
        'color': this.thing.dataObject.data.buttonTextColor
      }
    },
    cardCssVars () {
      return {
        'background-color': this.thing.dataObject.data.imageCardColor
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
}
.play
  font-size 4em
  background-color rgba(0, 0, 0, 0.5)
</style>
