<template>
  <q-page fit>
    <q-tab-panels
      v-model="tab"
      animated
    >

      <q-tab-panel
        name="createActivationsHome"
        style="min-height: 750px; background-color: rgb(77,0,169,0.9)"
        class=""
      >
        <div class="row ">
          <div class="col">
            <div class="row">
              <div class="col text-h6">
                <div class="row text-grey-3">{{thing.dataObject.data.header}}</div>
                <div class="row">
                  <div class="col text-grey-5 text-italic q-ml-lg text-caption">{{thing.dataObject.data.subtitle}}</div>
                </div>
              </div>
              <div class="col"></div>
              <q-btn
                flat
                v-close-popup
                class="text-grey-8"
                round
                icon="close"
              />
            </div>
          </div>
        </div>

        <div class="row items-center scroll q-mb-md q-mt-xs q-pa-md q-gutter-lg">
          <q-card
            style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songOne'"
                @click="tab = 'songOne'"
                active-class="text-weight-bold text-subtitle1"
              >

                <q-item-section>{{thing.dataObject.data.songOneTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
             style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songTwo'"
                @click="tab = 'songTwo'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songTwoTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songThree'"
                @click="tab = 'songThree'"
                active-class="text-weight-bold text-subtitle1"
              >

                <q-item-section>{{thing.dataObject.data.songThreeTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songFour'"
                @click="tab = 'songFour'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songFourTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songFive'"
                @click="tab = 'songFive'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songFiveTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songSix'"
                @click="tab = 'songSix'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songSixTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songSeven'"
                @click="tab = 'songSeven'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songSevenTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songEight'"
                @click="tab = 'songEight'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songEightTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songNine'"
                @click="tab = 'songNine'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songNineTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songTen'"
                @click="tab = 'songTen'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songTenTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songEleven'"
                @click="tab = 'songEleven'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songElevenTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
           class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songTwelve'"
                @click="tab = 'songTwelve'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songTwelveTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

           <q-card
           style=""
            class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songThirteen'"
                @click="tab = 'songThirteen'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songThirteenTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

           <q-card
           style=""
           class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songFourteen'"
                @click="tab = 'songFourteen'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songFourteenTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
           class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songFifteen'"
                @click="tab = 'songFifteen'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songFifteenTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card
           style=""
           class="bg-grey-10 text-center text-h6 col-11 q-px-sm q-py-xs"
          >
            <q-card-section>
              <q-item
                clickable
                v-ripple
                :active="tab === 'songSixteen'"
                @click="tab = 'songSixteen'"
                active-class="text-weight-bold text-subtitle1"
              >
                <q-item-section>{{thing.dataObject.data.songSixteenTitle}}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

        </div>

      </q-tab-panel>

      <q-tab-panel
        name="songOne"
        class="bg-black"
      >
              <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songOneTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songOneLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

      <q-tab-panel
        name="songTwo"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songTwoTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songTwoLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

      <q-tab-panel
        name="songThree"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songThreeTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songThreeLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

      <q-tab-panel
        name="songFour"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songFourTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songFourLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

            <q-tab-panel
        name="songFive"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
       <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songFiveTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songFiveLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

            <q-tab-panel
        name="songSix"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songSixTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songSixLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

            <q-tab-panel
        name="songSeven"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songSevenTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songSevenLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

               <q-tab-panel
        name="songEight"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songEightTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songEightLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

               <q-tab-panel
        name="songNine"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songNineTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songNineLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

               <q-tab-panel
        name="songTen"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
         <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songTenTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songTenLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

               <q-tab-panel
        name="songEleven"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songElevenTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songElevenLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

       <q-tab-panel
        name="songTwelve"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songTwelveTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songTwelveLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

            <q-tab-panel
        name="songThirteen"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songThirteenTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songThirteenLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

            <q-tab-panel
        name="songFourteen"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songFourteenTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songFourteenLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

            <q-tab-panel
        name="songFifteen"
        class="bg-black"
      >
                    <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
         <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songFifteenTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songFifteenLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

            <q-tab-panel
        name="songSixteen"
        class="bg-black"
      >
         <div class="row q-mb-xl">
          <div class="col">
            <q-btn
              flat
              class="text-grey-3"
              round
              dense
              :active="tab === 'createActivationsHome'"
              @click="tab = 'createActivationsHome'"
              icon="arrow_back"
            />
          </div>
        </div>
         <!--  -->
        <div class="row no-wrap q-mb-md justify-around">
        <div class="center-items text-h6">{{thing.dataObject.data.songSixteenTitle}}</div>
        </div>
        <div class="row no-wrap q-my-md justify-around">
        <div class="text-subtitle1 text-white q-pb-md q-px-md q-ml-md">
        <source-code :code="thing.dataObject.data.songSixteenLyrics" :bandi="true"/>
        </div>
        </div>
      </q-tab-panel>

    </q-tab-panels>

    <debug :json="$app" />
  </q-page>
</template>

<script>

export default {
  props: ['thing'],
  components: { },
  data () {
    return {
      tab: 'createActivationsHome',
      loaded: false
    }
  },
  mounted () {
    this.loaded = true
    this.$emit('loaded')
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e)
    },
    // Since everything we output is sent to a state machine with history,
    // you can increase your undo/redo steps & memory efficency by only
    // calling updateState when something meaningful happened (i.e. NOT
    // calling it every time the user presses a key, but maybe when they
    // only press enter, or navigate away from the element)
    updateState (key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
