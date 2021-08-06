<template>
  <q-page-container class='fit'>
    <iframe
      class="fit"
      frameBorder="0"
      src="https://docs.sourcesync.io"
      style="width:100%;height:100rem;"
      @load="loaded = true"
    />
  </q-page-container>
</template>

<script>
export default {
  name: 'help',
  components: {},
  data () {
    return {
      text: '',
      helpEmail: ''
    }
  }
}
</script>
