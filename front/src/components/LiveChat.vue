<template>
  <q-drawer
    v-model="drawer"
    :mini="!drawer || miniState"
    @click.capture="drawerClick"
    :width="300"
    :breakpoint="500"
    bordered
    content-class="underlay relative-position text-white"
    side="right"
    :class="style"
    v-if="screenWidth >= '860'"
    dark
  >
    <!-- header -->
    <q-list class="shadow-4" dark>
      <q-item v-ripple>
        <q-item-section avatar @click="miniState = true">
          <q-btn icon="keyboard_tab" flat>
            <q-tooltip>Collapse</q-tooltip>
          </q-btn>
        </q-item-section>

        <q-item-section class="text-center">Stream Chat</q-item-section>

        <q-item-section avatar @click="showUsers = true">
          <q-btn icon="people" flat>
            <q-tooltip>Users in Chat</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator dark></q-separator>

    <div class="text-white q-px-sm q-pt-sm live-chat" v-if="drawer && !miniState && !showUsers">
      <!-- message-section -->
      <div v-for="(message, index) in messages" :key="'message-' + index">
        <q-chat-message
          v-if="message.user === 'Me'"
          :name="message.user"
          :text="[ message.data ]"
          bg-color="transparent"
        >
          <template v-slot:avatar>
            <img
              v-if="message.avatar"
              class="q-message-avatar q-message-avatar--sent"
              :src="message.avatar"
            />
            <q-icon
              v-else
              class="text-grey-2 q-message-avatar q-message-avatar--sent bg-grey-6"
              size="xs"
              name="person"
            />
          </template>
        </q-chat-message>

        <q-chat-message v-else :name="message.user" :text="[message.data]" bg-color="transparent">
          <template v-slot:avatar>
            <img
              v-if="message.avatar"
              class="q-message-avatar q-message-avatar--received"
              :src="message.avatar"
            />
            <q-icon
              v-else
              class="text-grey-2 q-message-avatar q-message-avatar--received bg-grey-6"
              size="xs"
              name="person"
            />
          </template>
        </q-chat-message>
      </div>

      <!-- Send message -->
      <div class="bg-dark absolute-bottom">
        <q-separator dark></q-separator>
        <q-toolbar class="text-white row q-py-sm">
          <q-input dark v-model="chatMessage" label="Send a message" class="col-grow q-mr-sm">
            <template v-slot:after>
              <q-btn round dense flat icon="send" @click="sendMessage"></q-btn>
            </template>
          </q-input>
        </q-toolbar>
      </div>
    </div>

    <!-- users list -->
    <div v-if="!miniState && showUsers" class="users-list">
      <div class="text-white shadow-4">
        <q-item v-ripple>
          <q-item-section>Users in Chat</q-item-section>

          <div @click="showUsers = false">
            <q-btn icon="close" flat></q-btn>
          </div>
        </q-item>
      </div>

      <div class="q-pa-sm">
        <q-input outlined dark v-model="filter" label="Filter"></q-input>

        <div>
          <q-item v-for="(user, index) in users" :key="index" dark>
            <q-item-section>
              <q-item-label overline>{{user.overline}}</q-item-label>
              <q-item-label
                caption
                v-for="(nickname, i) in user.names"
                :key="i"
                class="text-accent"
              >{{nickname.nickname}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </q-drawer>

  <!-- mobile section, on bottom -->
  <div v-else class="bg-dark full-height">
    <q-separator dark></q-separator>
    <!-- header -->
    <div class="shadow-4">
      <q-item v-ripple>
        <q-item-section class="mobile-size">Stream Chat</q-item-section>

        <q-item-section avatar @click="showUsers = true">
          <q-btn icon="people" flat></q-btn>
        </q-item-section>
      </q-item>
    </div>
    <q-separator dark></q-separator>
    <div class="text-white q-px-sm q-pt-sm live-chat live-chat-mobile bg-dark" v-if="!showUsers">
       <q-scroll-area class="fit">
      <div v-for="(message, index) in messages" :key="'message1-' + index">

        <q-chat-message
          v-if="message.user === 'Me'"
          :name="message.user"
          :text="[ message.data ]"
          bg-color="transparent"
        >
          <template v-slot:avatar>
            <img
              v-if="message.avatar"
              class="q-message-avatar q-message-avatar--sent"
              :src="message.avatar"
            />
            <q-icon
              v-else
              class="text-grey-2 q-message-avatar q-message-avatar--sent bg-grey-6"
              size="xs"
              name="person"
            />
          </template>
        </q-chat-message>

        <q-chat-message v-else :name="message.user" :text="[message.data]" bg-color="transparent">
          <template v-slot:avatar>
            <img
              v-if="message.avatar"
              class="q-message-avatar q-message-avatar--received"
              :src="message.avatar"
            />
            <q-icon
              v-else
              class="text-grey-2 q-message-avatar q-message-avatar--received bg-grey-6"
              size="xs"
              name="person"
            />
          </template>
        </q-chat-message>

      </div>
      </q-scroll-area>

      <!-- Send message -->
      <div class="bg-dark absolute-bottom">
        <q-separator dark></q-separator>
        <q-toolbar class="text-white row q-py-sm">
          <q-input dark v-model="chatMessage" label="Send a message" class="col-grow q-mr-sm">
            <template v-slot:after>
              <q-btn round dense flat icon="send" @click="sendMessage"></q-btn>
            </template>
          </q-input>
        </q-toolbar>
      </div>
    </div>

    <!-- users list -->
    <div v-else class="user-list-mobile bg-dark">
      <div class="text-white shadow-4">
        <q-item v-ripple>
          <q-item-section>Users in Chat</q-item-section>

          <div @click="showUsers = false">
            <q-btn icon="close" flat></q-btn>
          </div>
        </q-item>
      </div>

      <div class="q-pa-sm">
        <q-input outlined dark v-model="filter" label="Filter"></q-input>

        <div>
          <q-item v-for="(user, index) in users" :key="index" dark>
            <q-item-section>
              <q-item-label overline>{{user.overline}}</q-item-label>
              <q-item-label
                caption
                v-for="(nickname, i) in user.names"
                :key="i"
                class="text-accent"
              >{{nickname.nickname}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      miniState: false,
      chatMessage: '',
      showUsers: false,
      messages: [
        {
          user: 'Peter',
          avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
          data: 'hey, how are you?'
        },
        {
          user: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          data: 'doing fine, how r you?'
        },
        {
          user: 'Peter',
          data: 'hey, how are you?'
        },
        {
          user: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          data: 'doing fine, how r you?'
        },
        {
          user: 'Peter',
          avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
          data: 'hey, how are you?'
        },
        {
          user: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          data: 'doing fine, how r you?'
        },
        {
          user: 'Peter',
          data: 'hey, how are you?'
        },
        {
          user: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          data: 'doing fine, how r you?'
        }
      ],
      window: {
        width: 0
      },
      filter: '',
      users: [
        {
          overline: 'Broadcaster',
          names: [
            {
              nickname: 'Sharishaxd'
            }
          ]
        },
        {
          overline: 'Moderators',
          names: [
            { nickname: 'Barenzi' },
            { nickname: 'Justbelo' },
            { nickname: 'Mikuia' },
            { nickname: 'Barenzi' },
            { nickname: 'Reflectingod_' }
          ]
        },
        {
          overline: 'Users',
          names: [
            { nickname: '00ea48f94574' },
            { nickname: 'Justbelo' },
            { nickname: '16871bizon' },
            { nickname: 'Mikuia' },
            { nickname: '2oo7' },
            { nickname: '1horizonn' }
          ]
        }
      ]
    }
  },
  methods: {
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false

        e.stopPropagation()
      }
    },
    sendMessage () {
      this.messages.push({
        user: 'Me',
        data: this.chatMessage
      })
      this.chatMessage = ''
    }
  },
  computed: {
    style () {
      let c
      if (this.$app.layout.orientation === 'portrait') {
        // c = 'hidden'
      } else if (this.window.width <= '860') {
        document.getElementsByClassName(
          'q-page-container'
        )[0].style.paddingRight = '0'
      }
      return c
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-list {
  width: 100%;
  position: fixed;
  top: 0;
  height: 50px;
  z-index: 1;
}

.live-chat {
  padding-top: 60px;

  /deep/.q-message-avatar {
    width: 18px;
    height: 18px;
    min-width: 18px;
  }

  /deep/.q-message-text:last-child {
    min-height: auto;
  }

  .q-message {
    /deep/.items-end {
      align-items: center;
    }

    /deep/.q-message-container {
      div:nth-of-type(1) {
        display: flex;
        align-items: center;
      }

      .q-icon {
        margin-right: 10px;
      }

      .q-message-name {
        color: $primary;
      }

      .q-message-text {
        padding: 0 8px;
        font-size: 12px;
      }

      .q-message-text-content--received {
        color: #fff;
      }

      .q-message-avatar--sent {
        margin-left: 0;
      }
    }
  }
}

.users-list {
  padding-top: 50px;
}

@media all and (max-width: 860px) {
  .live-chat-mobile {
    position: relative;
    height: 100%;
    padding-top: 10px;

    .q-scrollarea {
      padding-bottom: 80px;
    }
  }

  .mobile-size {
    font-size: 16px;
  }

  .q-message {
    /deep/.q-message-container {
      div:nth-of-type(1) {
        font-size: 16px;
      }
    }
  }
}
</style>
