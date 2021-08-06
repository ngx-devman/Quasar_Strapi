<template>
  <q-page-container class="row">
    <div class="row justify-center q-col-gutter-md">
      <designer/>
    </div>
  </q-page-container>
</template>

<script>
import designer from 'components/designer/designer.vue'
export default {
  name: 'favorite',
  components: { designer }
}
</script>
