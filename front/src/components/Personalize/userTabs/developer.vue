<template>
  <div>
    <q-page-container class="fit">
      closeModal{{closeModal}}
      <q-page padding>
        <q-card>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" basic style="max-height: 300px">
            <div class="absolute-full flex flex-center text-h4 column">
              <div class="q-mb-md">Design Everything</div>
              <q-input
                v-model="search"
                filled
                type="search"
                label="Try 'Resume'"
                label-color="grey-7"
                bg-color="white"
                style="width: 60%"
              >
                <template v-slot:append>
                  <q-icon name="search"></q-icon>
                </template>
              </q-input>
            </div>
          </q-img>

          <q-card-section>
            <div class="text-bold text-h6">Create a design</div>

            <div class="q-gutter-y-md q-mt-md">
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="recommender" label="Recommender"></q-tab>
                <q-tab name="social" label="Social Media"></q-tab>
                <q-tab name="events" label="Events"></q-tab>
                <q-tab name="marketing" label="Marketing"></q-tab>
                <q-tab name="documents" label="Documents"></q-tab>
                <q-tab name="prints" label="Prints"></q-tab>
                <q-tab name="video" label="Video"></q-tab>
                <q-tab name="school" label="School"></q-tab>
              </q-tabs>

              <q-separator></q-separator>

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel v-for="(panel, index) in panels" :key="index" :name="panel.panelName">
                  <q-scroll-area horizontal style="height: 250px; width: 100%;">
                    <div class="row items-start q-gutter-md no-wrap">
                      <q-card
                        class="my-card cursor-pointer"
                        v-for="n in 10"
                        :key="n"
                        @click="designDialog = !designDialog"
                      >
                        <img src="https://cdn.quasar.dev/img/mountains.jpg" />

                        <q-card-section>
                          <div class="text-subtitle2">Instagram Post</div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-scroll-area>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

    <designer v-if="designDialog" @closeModal="closeModal" />
  </div>
</template>

<script>
import designer from 'components/Personalize/userTabs/designer'
export default {
  name: 'developer',
  components: { designer },
  data () {
    return {
      designDialog: false,
      search: '',
      tab: 'recommender',
      panels: [
        {
          panelName: 'recommender'
        },
        {
          panelName: 'social'
        },
        {
          panelName: 'events'
        },
        {
          panelName: 'marketing'
        },
        {
          panelName: 'documents'
        },
        {
          panelName: 'prints'
        },
        {
          panelName: 'video'
        },
        {
          panelName: 'school'
        },
        {
          panelName: 'pesronal'
        }
      ]
    }
  },
  methods: {
    closeModal () {
      this.designDialog = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
  min-width: 250px;
}
</style>
