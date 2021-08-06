<template>
  <div>
    <mediaManager v-model="value" @changeImage="handleChangeImage" />
  </div>
</template>

<script>
import mediaManager from 'components/common/mediaManager'

export default {
  props: ['value'],
  components: {
    mediaManager
  },

  data () {
    return {
      mediaDialog: false
    }
  },
  methods: {
    handleChangeImage (payload) {

    }
  }
}
</script>
