<template>
  <q-page-container class="row justify-center">
    <q-card class="card-messages">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 500px">
          <q-chat-message label="Sunday, 19th"></q-chat-message>

          <q-chat-message
            name="me"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            :text="['Hey, I have problem with purchase']"
            sent
            stamp="7 minutes ago"
          ></q-chat-message>
          <q-chat-message
            name="Manager"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="[
                'Hello',
                'What kind of problem it is?'
            ]"
            stamp="4 minutes ago"
          ></q-chat-message>
          <q-input class="q-mt-lg" v-model="text" filled autogrow label="Type your message">
            <template v-slot:before>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </template>

            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"></q-icon>
            </template>

            <template v-slot:after>
              <q-btn round dense flat icon="send"></q-btn>
            </template>
          </q-input>
        </div>
      </div>
    </q-card>
  </q-page-container>
</template>

<script>
export default {
  props: [''],
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-messages {
  width: 600px;
}
</style>
