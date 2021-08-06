// TODO: deprecate legacy support
import RigidTemplate from './RigidTemplate' // legacy template (non-editable)
import RigidTemplateV2 from './RigidTemplateV2' // editable template (via metacontent settings)
import get from 'lodash/get'
export default {
  render (createEl) {
    return createEl(this.template, {
      props: this.rigidProps,
      on: {
        click: () => this.$emit('detail', this.index)
      }
    })
  },
  props: { thing: Object, index: Number },
  computed: {
    rigidProps () {
      // override this
      return {}
    },
    template () {
      if (get(this.thing, 'meta.data.settings.preview')) return RigidTemplateV2
      else return RigidTemplate
    }
  }
}
