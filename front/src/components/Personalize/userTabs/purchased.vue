<template>
  <q-page-container>
    <div class="text-center">
      <q-btn-toggle
        v-model="filter"
        push
        toggle-color="primary"
        color="white"
        text-color="primary"
        rounded
        unelevated
        :options="[
          {label: 'All', value: 'one'},
          {label: 'Movies', value: 'two'},
          {label: 'Books', value: 'three'},
          {label: 'Sport', value: 'fourth'}
        ]"
      ></q-btn-toggle>
    </div>

    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <q-item clickable v-ripple class="justify-center" style="min-height: 70px;">
          <q-item-section top avatar>
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL.jpg" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">The Fight Club</q-item-label>
            <q-item-label caption>English - Action</q-item-label>
            <q-chip
              outline
              color="primary"
              text-color="white"
              icon="event"
              class="text-center q-ml-none"
            >March 2nd, 2019</q-chip>
          </q-item-section>

          <q-item-section side>
            <q-icon name="info"></q-icon>
          </q-item-section>
        </q-item>

        <q-separator></q-separator>

        <q-item clickable v-ripple class="justify-center" style="min-height: 70px;">
          <q-item-section top avatar>
            <q-img src="https://upload.wikimedia.org/wikipedia/en/7/7d/Unbreakable_cover.jpg" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Backstreet Boys</q-item-label>
            <q-item-label caption>Music - Live</q-item-label>
            <q-chip
              outline
              color="primary"
              text-color="white"
              icon="event"
              class="text-center q-ml-none"
            >February 22, 2019</q-chip>
          </q-item-section>

          <q-item-section side>
            <q-icon name="info"></q-icon>
          </q-item-section>
        </q-item>

        <q-separator></q-separator>

        <q-item clickable v-ripple class="justify-center" style="min-height: 70px;">
          <q-item-section top avatar>
            <q-img
              src="https://yorkshireccc.com/uploads/crop_image/680/453/20190820142133_Header%20-%202020.png?"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">England vs Australia</q-item-label>
            <q-item-label caption>T20 - Cricket</q-item-label>
            <q-chip
              outline
              color="primary"
              text-color="white"
              icon="event"
              class="text-center q-ml-none"
            >February 22, 2019</q-chip>
          </q-item-section>

          <q-item-section side>
            <q-icon name="info"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page-container>
</template>

<script>
export default {
  name: 'purchased',
  components: {},
  data () {
    return {
      filter: 'one'
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-chip {
  max-width: 200px;
}

.q-chip__content col {
  justify-content: center;
}
</style>
