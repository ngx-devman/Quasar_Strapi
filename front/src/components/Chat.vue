<template>
  <q-page-container class='fit'>
    <q-card class='scroll fit' square>
      <q-layout view="hHh Lpr lff" class="CHAT__layout shadow-3" container>
        <!-- Top Toolbar -->
        <q-header elevated>
          <q-toolbar class="bg-dark text-white">
            <q-btn
              round
              flat
              icon="person"
              class="q-mr-sm"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
            <q-space/>
            <q-btn round flat icon="more_vert">
              <q-menu auto-close :offset="[110, 8]">
                <q-list style="min-width: 150px">
                  <q-item clickable @click='show=false'>
                    <q-item-section>Close</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-toolbar>
        </q-header>

        <!-- User List -->
        <q-drawer
          v-model="leftDrawerOpen"
          bordered
          :breakpoint="690"
          dark
        >
          <q-scroll-area style="height: calc(100% - 100px)">
            <q-list separator dark>
              <q-item
                v-for="(user, index) in userList"
                :key="index"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="user.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    {{ user.person }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn round flat icon="more_vert">
                    <q-menu auto-close :offset="[110, 8]">
                      <q-list style="min-width: 150px">
                        <q-item clickable>
                          <q-item-section>Report</q-item-section>
                        </q-item>
                        <!-- Ban Button -->
                        <q-item clickable v-if="$user.can('update', 'distributions', $app.session.distribution)" @click='banned = true'>
                          <q-item-section>Ban</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>

        <!-- Chat Area -->
        <div v-if='!banned'>
          <q-page-container class="CHAT__bgColor" >
            <q-page class="q-pa-md scroll">
              <div class="row justify-center full-width">
                <div class='fit'>
                  <div v-for="(message, index) in messages" :key="'message-' + index">
                    <q-chat-message
                      v-if="message.user === 'Me'"
                      class='text-white'
                      :name='message.user' :text="[ message.data ]"
                      sent text-color="white" bg-color="primary"
                    >
                      <template v-slot:avatar>
                        <img
                          v-if='message.avatar'
                          class="q-message-avatar q-message-avatar--sent"
                          :src="message.avatar"
                        >
                        <q-icon v-else class="text-grey-2 q-message-avatar q-message-avatar--sent bg-grey-6" size='lg' name='person'/>
                      </template>
                    </q-chat-message>
                    <q-chat-message v-else :name="message.user" class='text-white' :avatar="message.avatar" :text="[ message.data ]" bg-color="amber">
                      <template v-slot:avatar>
                        <img
                          v-if='message.avatar'
                          class="q-message-avatar q-message-avatar--received"
                          :src="message.avatar"
                        />
                        <q-icon v-else class="text-grey-2 q-message-avatar q-message-avatar--received bg-grey-6" size='lg' name='person'/>
                      </template>
                    </q-chat-message>
                  </div>
                </div>
              </div>
            </q-page>
          </q-page-container>

          <!-- Send message -->
          <q-footer>
            <q-toolbar class="bg-dark text-white row q-py-sm">
              <q-input dark outlined square dense class='col-grow q-mr-sm' v-model="chatMessage" placeholder="Send a message" @keyup.enter="sendMessage" />
            </q-toolbar>
          </q-footer>
        </div>

        <!-- Banned -->
        <div v-else>
          <q-page-container class="CHAT__bgColor" >
            <q-page class="q-pa-md scroll flex flex-center text-white">
              <q-card class='column q-pa-md' dark>
                <q-card-section class='text-h5 text-negative'>You've been banned from participating in this chat</q-card-section>
                <q-card-section class='q-py-none'>Due to your recent activities, you have been restricted from viewing/sending messages in this chat.</q-card-section>
                <q-card-section class='q-pb-none'>
                  <div>You were banned for the following:</div>
                  <ul>
                    <li v-for='(reason,index) in reasons' :key='index'>{{reason}}</li>
                  </ul>
                </q-card-section>
                <q-card-section class='q-pt-none'>If you have any questions regarding your ban, please contact <a href="mailto:disputes@sourcedigital.net" class='text-primary'>Customer Support</a>.</q-card-section>
              </q-card>
            </q-page>
          </q-page-container>
        </div>

      </q-layout>
    </q-card>
  </q-page-container>
</template>

<script>
export default {
  events: {
    toggleChat () {
      this.show = !this.show
    }
  },
  realtime: {
    chatMessage (payload) {
      this.messages.push(payload)
    }
  },
  methods: {
    sendMessage () {
      this.messages.push({ user: 'Me', data: this.chatMessage, avatar: this.$app.user.photo.url ? this.$app.user.photo.url : null })
      this.$realtime('chatMessage', this.chatMessage)
      this.chatMessage = ''
    }
  },
  data () {
    return {
      show: false,
      messages: [],
      chatMessage: '', // The outgoing message
      leftDrawerOpen: false,
      banned: false,
      reasons: ['Using offensive language', 'Harassing other users'],
      // Placeholder data for user list
      userList: [
        {
          id: 1,
          person: 'Razvan Stoenescu',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          caption: 'I\'m working on Quasar!',
          time: '15:00',
          sent: true
        },
        {
          id: 2,
          person: 'Dan Popescu',
          avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
          caption: 'I\'m working on Quasar!',
          time: '16:00',
          sent: true
        },
        {
          id: 3,
          person: 'Jeff Galbraith',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          caption: 'I\'m working on Quasar!',
          time: '18:00',
          sent: true
        },
        {
          id: 4,
          person: 'Allan Gaunt',
          avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
          caption: 'I\'m working on Quasar!',
          time: '17:00',
          sent: true
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-page-container
  padding-top 50px!important
.CHAT
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &__layout
    height: 100%
  &__field.q-field--outlined .q-field__control:before
    border: none
  &__bgColor
    background-color rgb(59,59,59)
@media (max-width: 850px)
  .CHAT
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

</style>
