<script>
import BaseBubble from './BaseBubble.js'
import get from 'lodash/get'
export default {
  extends: BaseBubble,
  computed: {
    bubbleProps () {
      return {
        leftIcon: this.leftIcon,
        line1: get(this.thing, 'dataObject.name'),
        line2: get(this.thing, ['settings', 'details', this.thing['@type'], 'name']),
        imageUrl: get(this.thing, 'dataObject.mainImageUrl'),
        icon: get(this.thing, 'settings.icon')
      }
    }
  }
}
</script>
