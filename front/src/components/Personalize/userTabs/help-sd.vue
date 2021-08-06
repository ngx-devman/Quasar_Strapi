<template>
  <q-page-container class='fit'>
    <iframe
      class="fit"
      frameBorder="0"
      :src="computedSrc"
      style="width:100%;height:100rem;"
      @load="loaded = true"
    />
  </q-page-container>
</template>

<script>
export default {
  name: 'help-sd',
  computed: {
    computedSrc () {
      return process.env.DEV ? 'http://localhost:3000' : 'https://docs.source.tools'
    }
  },
  data () {
    return {
      text: '',
      helpEmail: ''
    }
  }
}
</script>
