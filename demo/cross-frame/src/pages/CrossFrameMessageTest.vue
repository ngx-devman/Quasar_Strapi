<template>
  <q-page padding>
    <div class="row justify-center">
      <cross-frame-tester />
    </div>
  </q-page>
</template>

<script>
import CrossFrameTester from 'src/components/CrossFrameTester.vue'
export default {
  components: { CrossFrameTester },
  name: 'PageIndex'
}
</script>
