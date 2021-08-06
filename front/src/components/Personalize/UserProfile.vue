<template>
  <q-dialog v-model="value" @hide="onHide" persistent maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card>
      <q-layout view="hHh Lpr lff" container>
        <q-header elevated>
          <q-toolbar class="q-py-md bg-grey-10 q-px-md">
            <q-toolbar-title class="q-mx-md">My Account</q-toolbar-title>
            <q-space></q-space>
            <q-btn icon="close" flat round dense @click="onHide"></q-btn>
          </q-toolbar>
        </q-header>
        <!-- Drawer -->
        <q-drawer v-model="drawer" mini show-if-above :width="180" :breakpoint="220" bordered dark>
          <q-tabs v-model="tab" dense animated swipeable vertical inline-label transition-prev="scale" transition-next="scale" class="bg-dark tab-wrapper">
            <q-list padding dark>
              <!-- Profile -->
              <q-item clickable v-ripple>
                <q-tab name="person">
                  <q-item-section avatar>
                    <q-icon name="person"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Profile
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Profile
                </q-tooltip>
              </q-item>
              <!-- Chat -->
             <q-item v-if="$user.isInternal()" clickable v-ripple>
                <q-tab name="chat">
                  <q-item-section avatar>
                    <q-icon name="chat"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Chat
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Chat (only visible to internal users)
                </q-tooltip>
              </q-item>
              <!-- Settings -->
              <q-item clickable v-ripple>
                <q-tab name="settings">
                  <q-item-section avatar>
                    <q-icon name="settings"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Settings
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Settings
                </q-tooltip>
              </q-item>
              <!-- Designer -->
              <!-- <q-item clickable v-ripple>
                <q-tab name="designer">
                  <q-item-section avatar>
                    <q-icon name="palette"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Designer
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Designer
                </q-tooltip>
              </q-item> -->
              <!-- Developer -->
              <q-item v-if="$user.isLoggedIn()" clickable v-ripple>
                <q-tab name="developer">
                  <q-item-section avatar>
                    <q-icon name="code"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Designer
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  The designer lets you create your own content and more!
                </q-tooltip>
              </q-item>
              <!-- Developer docs -->
              <q-item v-if="$user.isDeveloper()" clickable v-ripple>
                <q-tab name="helpDev">
                  <q-item-section avatar>
                    <q-icon name="extension"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Help for Developers
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Help for Developers (only visible to developers)
                </q-tooltip>
              </q-item>
              <q-separator ></q-separator>
              <!-- Internal Developer -->
              <q-item v-if="$user.isInternal()" clickable v-ripple>
                <q-tab name="helpSd">
                  <q-item-section avatar>
                    <q-icon name="bug_report"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Help SD
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Help for Source Digital Employees (only visible to internal users)
                </q-tooltip>
              </q-item>
              <q-separator ></q-separator>
              <!-- Help -->
              <q-item clickable v-ripple>
                <q-tab name="help">
                  <q-item-section avatar>
                    <q-icon name="help"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Help
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Help
                </q-tooltip>
              </q-item>
              <q-separator ></q-separator>
              <!-- Logout -->
              <q-item clickable v-ripple @click="$emit('action','logout')">
                <q-tab name="logOut">
                  <q-item-section avatar>
                    <q-icon name="keyboard_backspace"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    Log out
                  </q-item-section>
                </q-tab>
                <q-tooltip v-if='$q.screen.gt.sm' anchor="center right" self="center left" :offset="[10, 10]">
                  Log out
                </q-tooltip>
              </q-item>
            </q-list>
          </q-tabs>
        </q-drawer>

        <q-tab-panels class='window-height scroll overflow-hidden' v-model="tab" animated transition-prev="fade" transition-next="fade">
          <q-tab-panel name="person">
            <personal-info   v-model="value" :user='user'/>
          </q-tab-panel>

          <q-tab-panel name="content">
            <content-wallet/>
          </q-tab-panel>

          <q-tab-panel name="purchased">
            <!-- <purchased /> -->
          </q-tab-panel>

          <q-tab-panel name="chat">
            <chat />
          </q-tab-panel>

          <q-tab-panel name="favorite">
            <!-- <favorite /> -->
          </q-tab-panel>

          <q-tab-panel name="watchlist">
            <!-- <watch-list /> -->
          </q-tab-panel>

          <q-tab-panel name="settings">
            <settings />
          </q-tab-panel>

          <q-tab-panel name="help">
            <help />
          </q-tab-panel>
          <q-tab-panel name="helpSd">
            <help-sd />
          </q-tab-panel>
          <q-tab-panel name="helpDev">
            <help-dev />
          </q-tab-panel>
          <q-tab-panel name="developer">
            <developer />
          </q-tab-panel>
          <!-- <q-tab-panel name="designer">
            <designer />
          </q-tab-panel> -->
        </q-tab-panels>
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script>
import personalInfo from 'components/Personalize/userTabs/personalInfo'
import contentWallet from 'components/Personalize/userTabs/contentWallet'
// import designer from 'components/Personalize/userTabs/designer'
// import purchased from 'components/Personalize/userTabs/purchased'
import Chat from 'components/Chat'
// import favorite from 'components/Personalize/userTabs/favorite'
// import watchList from 'components/Personalize/userTabs/watchList'
import settings from 'components/Personalize/userTabs/settings'
import help from 'components/Personalize/userTabs/help'
import helpSd from 'components/Personalize/userTabs/help-sd'
import helpDev from 'components/Personalize/userTabs/help-dev'
import developer from 'components/Personalize/userTabs/developer'

export default {
  name: 'user-profile',
  props: ['value', 'user'],
  components: {
    personalInfo,
    contentWallet,
    // designer,
    // purchased,
    Chat,
    // favorite,
    // watchList,
    settings,
    help,
    helpSd,
    helpDev,
    developer
  },
  data () {
    return {
      open: false,
      drawer: true,
      miniState: true,
      tab: 'person'
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
      this.$emit('input', false)
    }
  },
  computed: {}
}
</script>
<style lang="stylus" scoped>
/deep/.tab-wrapper .q-tab {
  width: 100%;
  justify-content: flex-start;
  padding: 8px 16px;
}

.q-tab--active {
  background: rgba(6, 143, 198, 0.1);
}

.q-item {
  padding 0;
}
/deep/div.q-tab__content
  justify-content flex-start!important
/deep/div.q-drawer-container > aside
  transition all 0.3s!important
.q-page-container
  transition all 0.3s!important
.q-tab-panel
  padding-right: 0px!important
  padding-left: 0px!important
  padding-bottom: 0px!important
</style>
