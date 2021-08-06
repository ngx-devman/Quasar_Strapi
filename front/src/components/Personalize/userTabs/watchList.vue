<template>
  <q-page-container class="row">
    <div class="row justify-center q-col-gutter-md">
      <div class="col-md-4" v-for="item in items" :key="item.index">
        <q-card>
          <q-video :src="item.src"></q-video>

          <q-card-section class="text-black text-left">
            <div class="text-h6">Film name 1</div>
            <div class="text-subtitle2">234 views</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page-container>
</template>

<script>
export default {
  name: 'watch-list',
  components: {},
  data () {
    return {
      items: [
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        },
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        },
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        },
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        },
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        },
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        },
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        },
        {
          src: 'https://www.youtube.com/embed/NzDTMbx7xhY?rel=0'
        }
      ]
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
