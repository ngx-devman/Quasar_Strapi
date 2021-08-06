<template>
    <div class="">
        <div class="">{{thing.dataObject.data.name}}</div>

    </div>
</template>

<script>

export default {
  props: ['thing'],
  components: { },
  mounted () {
    this.$emit('loaded')
  }
}
</script>
