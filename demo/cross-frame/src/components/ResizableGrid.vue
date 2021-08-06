<template>
  <q-splitter
    v-model="xl"
    :limits="limits"
    unit="px"
  >
    <template #before />
    <template #after>
      <q-splitter
        v-model="xr"
        reverse
        :limits="limits"
        unit="px"
      >
        <template #after />
        <template #before>
          <q-splitter
            horizontal
            :limits="limits"
            unit="px"
            v-model="yt"
          >
            <template #before />
            <template #after>
              <q-splitter
                horizontal
                v-model="yb"
                reverse
                :limits="limits"
                unit="px"
              >
                <template #before>
                  <slot />
                </template>
                <template #after />
              </q-splitter>
            </template>
          </q-splitter>
        </template>
      </q-splitter>
    </template>
  </q-splitter>
</template>

<script>
export default {
  data () {
    return {
      limits: [5, Infinity],
      xl: 100,
      xr: 100,
      yt: 100,
      yb: 100
    }
  }
}
</script>

<style>

</style>
