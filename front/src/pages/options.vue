<template>
  <q-page>
    <options />
  </q-page>
</template>

<script>
import options from '../components/Options/options'

export default {
  name: 'Options',
  components: { options },
  data () {
    return {
      debug: this.$debug.extend('page:options')
    }
  }
}
</script>
