<template>
    <transition :name="'sdAnimation-' + animation">
      <img
        v-show="loaded"
        class="image cursor-pointer thing-main-image"
        :src="url"
        @click="$emit('click', $event)"
        @load="loaded = true"
      />
    </transition>
</template>

<script>
/**
 * Draws an image with fade in (or other animation )
 */
export default {
  name: 'sd-img',
  props: {
    animation: {
      type: String,
      default: 'fade'
    },
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loaded: false
    }
  }
}
</script>
