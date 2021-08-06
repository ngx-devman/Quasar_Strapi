<template>
  <q-dialog v-model='value' @hide='onHide' seamless full-height :content-class="'padding-none'" position="left" >
    <q-card class="col full-height" style="background-color: rgba(0,0,0,.5; color: white;">
      <q-separator />
      <q-card-section class="row items-center q-pb-none">
          <q-space ></q-space>
          <q-btn icon="close" flat round dense @click='onHide'></q-btn>
        </q-card-section>
      <div class="column no-wrap q-mt-sm q-mx-lg filter-button">
        <q-btn
            class="q-mb-md text-white row justify-between" text-color="white"
            v-for="(filter, index) in filters"
            :key="index"
            :class="{ active: filter.selected }"
            @click="$set(filter, 'selected', !filter.selected)"
            >
            <div class="row items-center">
              <q-icon left size="3em" :name="filter.icon"></q-icon>
              <div>{{ filter.filterName }}</div>
            </div>
            <q-icon class="show-btn" right size="1.5em" name="check_circle_outline"></q-icon>
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'filters-dialog',
  props: ['value'],
  components: {},
  data () {
    return {
      open: false,
      selected: undefined,
      filters: [
        {
          icon: 'music_note',
          filterImage: '',
          filterName: 'Music'
        },
        {
          icon: 'shop',
          filterImage: '',
          filterName: 'Shop'
        },
        {
          icon: 'map',
          image: '',
          filterName: 'Places'
        },
        {
          icon: 'person',
          image: '',
          filterName: 'People'
        }
      ]
    }
  },
  methods: {
    onHide () {
      this.$emit('input', false)
    }
  },
  computed: {}
}
</script>
<style lang="stylus" scoped>
.show-btn {
  visibility: hidden;
}

/deep/.filter-button .q-btn__content {
  justify-content: space-between;
}

.active {
  background-color: black !important;
  color: white !important;

  .show-btn {
    visibility: visible;
  }
}
</style>
