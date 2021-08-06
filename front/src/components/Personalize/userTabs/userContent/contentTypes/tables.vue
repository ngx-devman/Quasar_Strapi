<template>
  <div class="user-content-tables row justify-center">
    <div
      v-for="(item, index) in content.items"
      :key="index"
      class="preview"
      :style="{'background-color': item.color}"
    >
      <p>Name: {{item.name}}</p>
      <p>Type: {{item.type}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-content-tables',
  props: ['content']
}
</script>

<style lang="stylus" scoped>
  .preview
    width 150px
    height 150px
    margin 20px
</style>
