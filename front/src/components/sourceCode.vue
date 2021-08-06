<template>
  <div v-html="html">
  </div>
</template>

<script>
export default {
  props: ['code', 'bandi'],
  computed: {
    html () {
      // Convert b & i tags if flagged...
      const unsafe = this.bandi ? this.$ee.templates.html.bandi(this.code) : this.code
      // Process the markdown after we escape the html tags...
      return this.$ee.templates.md.default(this.$ee.templates.html.escape(unsafe))
    }
  }
}
</script>
