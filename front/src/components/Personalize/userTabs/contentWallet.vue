<template>
  <q-page-container class="row">
    <!-- <p>Most popular</p> -->
    <div class="row justify-center q-col-gutter-md">
      <div class="" v-for="distribution in $app.user.distributions" :key="distribution.index">
        <q-card class="q-ma-sm q-pa-xs">
          <q-video :ratio="16/9" :src="distribution.media"></q-video>

          <q-card-section class="text-black text-left">
            <div class="text-h6">{{distribution.name}}</div>
            <div class="text-subtitle2">234 views</div>
          </q-card-section>

          <q-separator></q-separator>

          <q-card-actions align="right">
            <q-btn flat round color="red" icon="favorite"></q-btn>
            <q-btn flat round color="teal" icon="bookmark"></q-btn>
            <q-btn flat round color="primary" icon="share"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page-container>
</template>

<script>
export default {
  name: 'content-wallet',
  components: {},
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card {
  // width: 100%;
  // max-width: 250px;
}
</style>
