<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Sorry, that experience isn't defined <strong>(404)</strong></p>
    <p class="text-faded">Try one of these:</p>
    <p v-for="production in productions" class="text-faded" :key="production.id">
      {{production.name}} <a :href="`/000/${production.id}`">
      {{`/000/${production.id}`}}</a><br>
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data () {
    return {
      productions: [
        { id: '5d66dc3fad0d950a747c8b0e', name: 'Motortrend' },
        { id: '5d00599f123dc305b4170b65', name: 'Black Rifle Coffee Company' }
      ]
    }
  }
}
</script>
