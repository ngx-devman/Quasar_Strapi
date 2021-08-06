<template>
  <div class="q-my-md bubble-list-item-container cursor-pointer transition">
    <div class="row reverse items-center q-mx-sm no-wrap" @click="$emit('detail', index)">
       <q-chip
        v-model="cookies"
        :color="color"
        text-color="black"
        class="bubble-border"
        :class="(direction === 'right') ? 'reverse-item' : ''"
        style="height: 2.5em;"
        >
          <!-- image -->
          <q-avatar size="50px" style="border-radius: 50%;" :class="{'rotate-image': animation}">
            <img class="bubble-border" :src="thing.dataObject.mainImageUrl" />
          </q-avatar>
          <div :class="{'grow-text': animation}">
            <p class="q-mb-none text-body1 text-weight-medium" :class="`text-`+ textColor">{{ thing.dataObject.name }}</p>
          </div>
        </q-chip>

    </div>
  </div>
</template>

<script>
export default {
  props: ['thing', 'index'],
  data () {
    return {
      color: 'white',
      direction: 'right',
      textColor: 'black',
      animation: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.bubble-border
  border 2px solid black
/deep/.reverse-item .q-chip__content
  flex-direction row-reverse
  .q-avatar
    margin-right -0.45em
    margin-left 0.2em
</style>
