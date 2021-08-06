<template>
<div class='q-pa-md cursor-pointer text-center' @click='$emit("unmute")' style='background-color: rgba(0,0,0,0.7);z-index:2;' :class='setPositon'>
  <q-icon name='volume_off' class='q-pr-sm'/>Click to unmute
</div>
</template>

<script>
const validPositions = ['center', 'top-right', 'top-left', 'top', 'bottom', 'bottom-left', 'bottom-right']
export default {
  props: { position: String },
  computed: {
    setPositon () {
      if (validPositions.some(pos => pos === this.position)) return `absolute-${this.position}`
      else return 'absolute-center'
    }
  }
}
</script>
