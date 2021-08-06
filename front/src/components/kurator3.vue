<template>
  <q-layout class="bg-blue-grey-7">
    <q-header class="bg-blue-grey-9">
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm"></q-btn>

        <q-toolbar-title>Source</q-toolbar-title>

        <q-input dark borderless v-model="search" input-class="text-right" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search"></q-icon>
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"></q-icon>
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pb-none">
      <q-page class="q-pa-md">
        <div class="row justify-between">
          <span class="text-white">Activations</span>

          <q-btn color="white" flat label="See all"></q-btn>
        </div>

        <div class="row no-wrap" style="    overflow-x: auto;">
          <div
            v-for="activation in items"
            :key="activation.index"
            class="column items-center justify-center q-mr-lg"
          >
            <q-btn size="19px" round>
              <q-avatar size="52px">
                <img :src="activation.dataObject.mainImageUrl" />
              </q-avatar>
            </q-btn>
            <div class="text-white text-center q-mt-sm">Sparkling Ice</div>
          </div>
        </div>

        <!-- tabs -->
        <q-tabs
          v-model="tab"
          class="text-white q-mt-lg bg-blue-grey-9 overflow-hidden"
          style="border-radius: 40px"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="new" label="New" no-caps></q-tab>•
          <q-tab name="active" label="Active" no-caps></q-tab>•
          <q-tab name="sheduled" label="Sheduled" no-caps></q-tab>•
          <q-tab name="draft" label="Draft" no-caps></q-tab>
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="new">
            <div class="text-h6">New</div>
          </q-tab-panel>

          <q-tab-panel name="active">
            <div class="row no-wrap q-mb-lg" style="max-width: 100%; overflow-y: hidden">
              <q-card
                dark
                bordered
                class="bg-blue-grey-9 q-mr-md q-mb-md"
                style="border-radius: 20px; min-width: 250px"
                v-for="activation in items"
                :key="activation.index"
              >
                <q-card-section class="row justify-between small-padding">
                  <div class="row">
                    <q-avatar class="q-mr-md">
                      <img :src="activation.dataObject.mainImageUrl" />
                    </q-avatar>
                    <div class="text-subtitle1">
                      <div>$26/hr</div>
                      <div>John Doe</div>
                    </div>
                  </div>

                  <!-- active -->
                  <div class="row items-center self-start">
                    <span>11</span>
                    <div
                      class="bg-green q-ml-xs"
                      style="width: 7px; height: 7px; border-radius: 50%"
                    ></div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="row justify-between items-center">
                    <div>
                      <TrendChart
                        :datasets="datasets"
                        :grid="{
                          verticalLines: false,
                          horizontalLines: true
                        }"
                        :min="0"
                      ></TrendChart>
                    </div>
                    <div class="text-yellow q-mr-sm">38%</div>
                    <q-icon name="arrow_upward" color="green" />
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <ListOrganizations />

            <div class="row q-col-gutter-x-md">
              <div
                v-for="activation in items"
                :key="activation.index"
                class="q-mb-md col-md-3 col-sm-6 col-xs-12"
              >
                <q-card
                  dark
                  class="my-card bg-blue-grey-9"
                  style="border-radius: 20px; overflow: hidden;"
                >
                  <q-card-section class="q-pa-none">
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="q-video">
                          <iframe
                            src="https://www.youtube.com/embed/NzDTMbx7xhY?rel=0"
                            frameborder="0"
                            allowfullscreen
                          />
                        </div>

                        <div class="q-pa-sm">
                          <div class="row justify-between items-center no-wrap">
                            <div>13 Days</div>
                            <div>
                              <TrendChart
                                :datasets="datasets2"
                                :grid="{
                                verticalLines: false,
                                horizontalLines: true
                              }"
                                :min="0"
                              ></TrendChart>
                            </div>
                            <div>$ 8.22 CPA</div>
                          </div>

                          <div class="text-center">
                            <div>BRCC - Fall Spice Coffee</div>
                            <q-linear-progress
                              :value="progress"
                              class="q-my-sm"
                              color="green"
                              track-color="yellow-12"
                            ></q-linear-progress>
                            <div>% of Goal</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="sheduled">
            <div class="text-h6">Sheduled</div>
          </q-tab-panel>

          <q-tab-panel name="draft">
            <div class="text-h6">Draft</div>
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-blue-grey-9">
      <q-toolbar class="row justify-around text-center">
        <q-btn flat no-caps label="Design"></q-btn>
        <q-btn flat no-caps label="Distribute"></q-btn>
        <q-btn flat no-caps label="Discover"></q-btn>
      </q-toolbar>

      <q-separator color="blue-grey-7" inset style="width: 15%; height: 3px; margin: 0 auto 15px;"></q-separator>
    </q-footer>
  </q-layout>
</template>

<script>
import ListOrganizations from './ListOrganizations'
export default {
  name: 'kurator3',
  props: ['items'],
  components: {
    ListOrganizations
  },
  data () {
    return {
      search: '',
      tab: 'active',
      progress: 0.4,
      datasets: [
        {
          data: [70, 100, 400, 180, 100, 300, 500],
          className: 'curve1'
        },
        {
          data: [150, 300, 350, 100, 350, 100, 15],
          className: 'curve2'
        }
      ],
      datasets2: [
        {
          data: [70, 100, 400, 180, 100, 300, 500],
          className: 'curve1'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
/deep/.q-tab-panels {
  background: none;
}

/deep/ .q-card__section.small-padding {
  padding: 10px;
}

.vtc {
  width: 150px;
  height: 40px;
  font-size: 12px;
}

/deep/.curve1 {
  .stroke {
    stroke: lime;
    stroke-width: 2;
  }
}

/deep/.curve2 {
  .stroke {
    stroke: green;
    stroke-width: 2;
  }
}
</style>
