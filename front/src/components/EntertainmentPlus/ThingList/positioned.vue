<template>
  <div></div>
</template>
<script>
export default {
  props: ['thing', 'index', 'position'],
  mounted () {
    this.$q.notify({
      message: this.thing.settings.details[this.thing['@type']].name,
      position: this.position,
      avatar: this.thing.settings.icon,
      timeout: 7000,
      classes: 'positioned-bubble',
      actions: [
        {
          noDismiss: true,
          handler: () => { this.$emit('detail', this.index) }
        }
      ]
    })
  }
}
</script>

<style lang="stylus">
.positioned-bubble.q-notification--standard
  padding 0
.positioned-bubble .q-notification__wrapper
  padding: 0 16px;
.positioned-bubble.q-notification--standard .q-notification__actions .q-btn
  position absolute
  width 100%
  height 100%
  left 0
.positioned-bubble .q-avatar
  width 1em
  margin-right 10px
  img
    object-fit cover
</style>
