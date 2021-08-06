<template>
  <div>
    <div
      class="text-h6 q-mb-md"
    >"Have a moment? Tell us what you like and dislike. We'll use it to find things perfect for you!"</div>

    <q-tabs
      v-model="category_tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <q-tab name="films" label="Films" />
      <q-tab name="music" label="Music" />
    </q-tabs>

    <q-tab-panels v-model="category_tab" animated>
      <q-tab-panel name="films">
        <div v-for="(preference_film, index) in likes.film" :key="index">
          <q-list bordered separator class="row justify-start items-center">
            <q-item clickable v-ripple class="q-py-md">
              <q-item-section class="text-grey text-bold text-capitalize">{{preference_film}}</q-item-section>
            </q-item>

            <div class="q-gutter-sm q-ml-auto q-mr-lg">
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="hate_it"
                label="Hate it"
                color="negative"
              />
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="dont_care"
                label="Don't care"
                color="warning"
              />
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="like_it"
                label="Like it"
                color="secondary"
              />
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="love_it"
                label="Love it"
                color="positive"
              />
            </div>
          </q-list>
        </div>
      </q-tab-panel>

      <q-tab-panel name="music">
        <div v-for="(preference_music, index) in likes.music" :key="index">
          <q-list bordered separator class="row justify-start items-center">
            <q-item clickable v-ripple class="q-py-md">
              <q-item-section class="text-grey text-bold text-capitalize">{{preference_music}}</q-item-section>
            </q-item>

            <div class="q-gutter-sm q-ml-auto q-mr-lg">
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="hate_it"
                label="Hate it"
                color="negative"
              />
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="dont_care"
                label="Don't care"
                color="warning"
              />
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="like_it"
                label="Like it"
                color="secondary"
              />
              <q-radio
                v-model="basicModel.parent_id[preference_film]"
                val="love_it"
                label="Love it"
                color="positive"
              />
            </div>
          </q-list>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: 'preferences',
  props: [],
  data () {
    return {
      likes: {
        film: '',
        music: ''
      },
      basicModel: {
        parent_id: []
      },
      category_tab: 'films'
    }
  },
  mounted () {
    const { film, music } = this.$app.user.settings.user.likes
    this.likes = {
      film,
      music
    }
  },
  methods: {},
  computed: {}
}
</script>
