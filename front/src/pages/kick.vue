<template>
  <q-page class='flex column'>
    <kurator3 :items="timeline" />
  </q-page>
</template>

<script>
import kurator3 from '../components/kurator3'

export default {
  name: 'Kurator3',
  props: ['productionId', 'customerId'],
  components: { kurator3 },
  data () {
    return {
      debug: this.$debug.extend('page:kurator3'),
      timeline: null
    }
  },
  async mounted () {
    this.debug('Detected production and customer', this.productionId, this.customerId)
    this.timeline = await this.$common.timeline.query({
      productionId: this.productionId,
      customerId: this.customerId
    })
    this.debug('timeline', this.timeline)
    /*
    // This is the newer, better way to call services using Feathers...
    this.$api.service('products').get(this.$config.config).then((r) => {
      console.log('Products...', r)
      this.products = r.products
    })
    */
  }
}
</script>
