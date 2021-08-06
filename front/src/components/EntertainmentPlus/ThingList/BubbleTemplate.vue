<template functional>
  <div class="bubble-list-item-container cursor-pointer" v-on="listeners">
    <div class="row items-center no-wrap" :class="{'reverse': props.leftIcon}">
      <!-- text -->
      <div class="bubble-list-item-text" v-if="props.line1 || props.line2" style="order: 1">
        <p class="q-mb-none text-body1" v-if="props.line1">{{props.line1}}</p>
        <p class="q-mb-none text-body1" v-if="props.line2">{{props.line2}}</p>
      </div>
      <!-- image -->
      <div class="q-mx-xs bubble-list-item-image" style="order: 2">
        <component :is="injections.components.QAvatar" size="50px">
          <img v-if="props.imageUrl" :src="props.imageUrl"/>
          <img v-else :src="props.icon" />
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import { QAvatar } from 'quasar'
export default {
  // https://github.com/vuejs/vue/issues/7492#issuecomment-379570456
  inject: {
    components: {
      default: {
        QAvatar
      }
    }
  },
  props: {
    line1: String,
    line2: String,
    imageUrl: String,
    icon: String,
    leftIcon: Boolean
  }
}
</script>
