<template>
  <div class="full-height">
    <div id="zac-is-awesome" class="q-ml-md bubble-list-item-image">
      <div class="lt-sm row justify-around items-center q-mr-xl q-my-md">
        <div class="text-h4">{{thing.dataObject.data.name}}</div>
        <div class="text-h5 text-white q-mx-sm">
                {{ thing.dataObject.data.role }}
              </div>
        <img
          :src="thing.dataObject.mainImageUrl"
          class="q-mt-lg q-mb-md"
          style="max-width: 15rem; object-fit: cover;"
        />
      </div>
      <div class="gt-xs row justify-around items-center q-mr-xl q-my-md">
        <div class="text-h4">{{thing.dataObject.data.name}}</div>
         <div class="text-h5 text-white q-mx-sm">
                {{ thing.dataObject.data.role }}
              </div>
        <q-avatar
          size="10rem"
          class="q-my-lg"
        >
          <img
            :src="thing.dataObject.mainImageUrl"
            style="object-fit: cover;"
          />
        </q-avatar>

      </div>
      <div class="text-h6">
         <source-code :code="thing.dataObject.data.bio" :bandi="true"/>

      </div>
      <div class="q-mt-lg">
        <div class="col-11 q-mx-md">
          <q-btn
            :style="cssVars"
            class="fit"
            type="a"
            flat
            :href="thing.dataObject.data.buttonRedirectUrl"
            target="_blank"
            :label="thing.dataObject.data.buttonText"
            :color="thing.dataObject.data.buttonColor"
            @click="$analytics($common.constants.events.action)"
          />
        </div>
        <!-- <div>
                <q-btn unelevated label="Follow" class="q-mb-md full-width rounded-borders" style="border: 3px solid #05D9FF; color: white" size="lg"></q-btn>
            </div>

            <div>
                <q-btn unelevated label="Buy Tickets" class="q-mb-md full-width blue-btn rounded-borders" size="lg"></q-btn>
            </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['thing'],
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$emit('loaded')
  },
  computed: {
    cssVars () {
      return {
        'background-color': this.thing.dataObject.data.buttonColor,
        'color': this.thing.dataObject.data.buttonTextColor,
        'min-width': this.thing.dataObject.data.buttonMinWidth,
        'max-width': this.thing.dataObject.data.buttonMaxWidth
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.blue-btn {
  background-image: linear-gradient(to right, #00c6ff 0%, #0072ff 51%, #00c6ff 100%);
}
</style>
