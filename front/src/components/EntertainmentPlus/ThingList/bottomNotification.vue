<template>
  <div></div>
</template>
<script>
export default {
  data () {
    return {
      avatarSize: '3em'
    }
  },
  methods: {
    changeAvatarSize () {
      let notifAvatar = document.getElementsByClassName('q-notification__avatar')
      for (let i = 0; i < notifAvatar.length; i++) {
        notifAvatar[i].style.width = this.avatarSize
        notifAvatar[i].style.height = this.avatarSize
      }
    }
  },
  mounted () {
    this.$q.notify({
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsa unde harum facere reiciendis officiis illum. Iusto, ex. Obcaecati, aliquid. Temporibus ipsa unde harum facere reiciendis officiis illum. Iusto, ex. Obcaecati, aliquid. ',
      position: 'bottom-left',
      timeout: 8000,
      group: false,
      avatar: 'https://images.ua.prom.st/1725890719_w640_h640_neonovaya-maska-sudnaya.jpg',
      classes: 'bottom-notif',
      color: 'white',
      textColor: 'black',
      actions: [
        {
          noDismiss: true
        }
      ]
    })

    this.changeAvatarSize()
  }
}
</script>

<style lang="stylus">
.q-notifications__list
    margin-bottom 50px
.bottom-notif.q-notification--standard
  padding 0
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border: 4px solid #000
  margin-bottom 10px
.bottom-notif .q-notification__message
  max-height: 75px;
  overflow-y: auto;
.bottom-notif .q-avatar
  width: 3em;
  height: 3em;
  margin-left -4px
  margin-right 10px
 .bottom-notif .q-notification__content
    max-height: 75px;
    flex-wrap: nowrap
  img
    object-fit cover
    border: 4px solid #000
</style>
