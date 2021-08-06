<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn round v-for="(icon, index) in social" :key="index">
        <q-avatar size="42px">
            <img :src="icon.src">
        </q-avatar>
        </q-btn>
    </div>
</template>

<script>
export default {
  name: 'connections',
  props: [],
  data () {
    return {
      social: [
        {
          src: 'https://cdn3.iconfinder.com/data/icons/material-design-social-icons/152/facebook_icon-64.png'
        },
        {
          src: 'https://cdn3.iconfinder.com/data/icons/material-design-social-icons/152/Twitter_icon-64.png'
        },
        {
          src: 'https://cdn3.iconfinder.com/data/icons/material-design-social-icons/152/instagram_icon-64.png'
        },
        {
          src: 'https://cdn2.iconfinder.com/data/icons/gaming-platforms-squircle/250/twitch_squircle-64.png'
        },
        {
          src: 'https://cdn3.iconfinder.com/data/icons/material-design-social-icons/152/You_Tube_icon-64.png'
        },
        {
          src: 'https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-64.png'
        }
      ]
    }
  },
  mounted () {
  }
}
</script>
