export default {
  name: 'Analytics',
  props: ['action', 'billing', 'label', 'hitType'],
  mounted () {
    this.$analytics(this.action, this.label, this.billing, this.hitType)
  },
  render (h) {
    return h('div')
  }
}
