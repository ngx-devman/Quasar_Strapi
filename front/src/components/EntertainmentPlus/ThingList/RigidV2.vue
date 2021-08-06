<script>
import BaseRigid from './BaseRigid.js'
import get from 'lodash/get'
export default {
  extends: BaseRigid,
  computed: {
    rigidProps () {
      return {
        text: get(this.thing, 'meta.display'),
        icon: get(this.thing, 'meta.icon'),
        color: get(this.$app, 'settings.layout.activations.portrait.text.color'),
        edited: get(this.thing, 'meta.data.settings.preview')
      }
    }
  }
}
</script>
