<template>
  <q-dialog
    v-model="open"
    @hide="onHide"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-layout view="hHh Lpr lff" container>
        <!-- Header -->
        <q-header elevated>
          <q-toolbar class="q-py-md bg-grey-10 q-px-md">
            <q-toolbar-title class="q-mx-md">Designer</q-toolbar-title>
            <q-space></q-space>
            <q-btn icon="close" flat round dense @click="onHide"></q-btn>
          </q-toolbar>
        </q-header>
        <!-- Drawer -->
        <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="100" mini bordered dark>
          <q-tabs
            v-model="tab"
            dense
            animated
            swipeable
            vertical
            inline-label
            transition-prev="scale"
            transition-next="scale"
            class="bg-dark"
          >
            <q-list padding dark>
              <q-item
                clickable
                v-ripple
                @click="$emit('action', tab.name, drawerInner = true)"
                v-for="(tab, index) in tabs"
                :name="tab.name"
                :key="'tabMenuItem'+index"
              >
                <q-tab :name="tab.name">
                  <q-item-section avatar>
                    <q-icon :name="tab.icon"></q-icon>
                  </q-item-section>
                  <q-item-section>{{tab.title}}</q-item-section>
                </q-tab>
                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">{{tab.tip}}</q-tooltip>
              </q-item>
            </q-list>
          </q-tabs>
        </q-drawer>

        <q-page-container>
          <q-layout
            view="hHh Lpr lff"
            container
            style="height: 90vh"
            class="shadow-2 rounded-borders drawer-inner"
          >
            <q-drawer
              v-model="drawerInner"
              show-if-above
              :mini="!drawerInner || miniStateInner"
              @click.capture="drawerClick"
              :width="300"
              :breakpoint="100"
              bordered
              dark
              content-style="background: #293039"
            >
              <q-scroll-area class="fit">
                <q-tab-panels
                  class="scroll overflow-hidden bg-transparent"
                  v-model="tab"
                  animated
                  transition-prev="fade"
                  transition-next="fade"
                >
                  <q-tab-panel v-for="(tab, index) in tabs" :name="tab.name" :key="'tab'+index">
                    <component :is="tab.name+'-tab'" v-model="value" :user="user" />
                  </q-tab-panel>
                </q-tab-panels>
              </q-scroll-area>

              <div class="q-mini-drawer-hide absolute">
                <div
                  class="arrow-container relative-position cursor-pointer"
                  @click="drawerInner = !drawerInner"
                >
                  <svg viewBox="0 0 32 112" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.626 17.865l-1.94-1.131C17.684 14.981 16 12.608 16 10.133V0H0v112h16v-10.135c0-2.475 1.684-4.849 4.686-6.6l1.94-1.131C28.628 90.632 32 85.885 32 80.934v-49.87c0-4.95-3.372-9.698-9.374-13.199"
                      fill="#293039"
                    />
                  </svg>

                  <span aria-hidden="true" class="arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="1.25"
                        d="M7 3.17L4.88 5.3a1 1 0 0 0 0 1.42L7 8.83"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </q-drawer>
            <q-page-container>
              <q-page padding>
                <p
                  v-for="n in 15"
                  :key="n"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?</p>
              </q-page>
            </q-page-container>
          </q-layout>
        </q-page-container>
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script>
import templatesTab from 'components/designer/tabs/templates'
import photosTab from 'components/designer/tabs/photos'
import componentsTab from 'components/designer/tabs/components'
import uploadsTab from 'components/designer/tabs/uploads'
import appsTab from 'components/designer/tabs/apps'

export default {
  name: 'designer',
  props: ['value', 'user'],
  components: {
    templatesTab,
    photosTab,
    componentsTab,
    uploadsTab,
    appsTab
  },
  data () {
    return {
      open: true,
      drawer: true,
      miniState: true,
      tab: 'templates',
      tabs: {
        templates: {
          name: 'templates',
          title: 'Templates',
          icon: 'view_quilt',
          tip: 'Templates'
        },
        photos: {
          name: 'photos',
          title: 'Photos',
          icon: 'insert_photo',
          tip: 'Photos'
        },
        components: {
          name: 'components',
          title: 'Components',
          icon: 'category',
          tip: 'Components'
        },
        uploads: {
          name: 'uploads',
          title: 'Uploads',
          icon: 'cloud_upload',
          tip: 'Uploads'
        },
        apps: {
          name: 'apps',
          title: 'Apps',
          icon: 'phonelink_setup',
          tip: 'Apps'
        }
      },
      drawerInner: false,
      miniStateInner: false
    }
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
    },
    onHide () {
      this.open = false
      this.$emit('input', false)
      this.$emit('closeModal')
    },
    drawerClick (e) {
      if (this.miniStateInner) {
        this.miniStateInner = false
        e.stopPropagation()
      }
    }
  },
  computed: {}
}
</script>
<style lang="stylus" scoped>
/deep/.q-tab {
  width: 100%;
  justify-content: flex-start;
  padding: 8px 16px;
}

.q-tab--active {
  background: rgba(6, 143, 198, 0.1);
}

.q-item {
  padding: 0;
}

/deep/div.q-tab__content {
  justify-content: flex-start !important;
}

/deep/div.q-drawer-container > aside {
  transition: all 0.3s !important;
}

.q-page-container {
  transition: all 0.3s !important;
}

// .q-tab-panel
// padding-right: 0px!important
// padding-left: 0px!important
// padding-bottom: 0px!important
.q-mini-drawer-hide {
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  z-index: -1;
}

.arrow-container {
  width: 30px;
  margin-left: -13px;
}

.arrow {
  position: absolute;
  color: #fff;
  top: 50%;
  right: 20%;
  transform: translateY(-50%);
}

@media all and (max-width: 420px) {
  /deep/.drawer-inner .q-drawer--left.q-drawer--bordered {
    width: 90% !important;
  }
}
</style>
