<script>
import BaseBubble from './BaseBubble.js'
import get from 'lodash/get'
export default {
  extends: BaseBubble,
  computed: {
    bubbleProps () {
      return {
        leftIcon: this.leftIcon,
        line1: get(this.thing, 'meta.display'),
        imageUrl: get(this.thing, 'meta.icon')
      }
    }
  }
}
</script>
