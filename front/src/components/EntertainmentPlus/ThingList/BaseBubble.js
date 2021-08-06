import BubbleTemplate from './BubbleTemplate'
export default {
  render (createEl) {
    return createEl(BubbleTemplate, {
      props: this.bubbleProps,
      on: {
        click: () => this.$emit('detail', this.index)
      }
    })
  },
  props: { thing: Object, index: Number, leftIcon: Boolean },
  computed: {
    bubbleProps () {
      // override this
      return {}
    }
  },
  methods: {
  }
}
