<template functional>
  <div class="cursor-pointer transition" v-on="listeners">
    <q-item clickable v-ripple style="flex-wrap: wrap; width: 100%; !important">
      <q-item-section avatar top v-if="props.icon">
          <q-avatar size="60px" style="border-radius: 5px">
            <img :src="props.icon">
          </q-avatar>
      </q-item-section>

      <q-item-section middle>
        <q-item-label lines="1" :style="{ color: props.color }">
          <span class="text-weight-medium" v-if="props.text">{{props.text}}</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'RigidTemplate',
  props: {
    icon: String,
    text: String,
    color: String
  }
}
</script>
