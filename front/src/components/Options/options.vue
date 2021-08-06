<template>
  <q-page-container class="q-pa-md">
    <q-btn label="Open modal" color="primary" @click="modalCard = true"></q-btn>

    <q-dialog v-model="modalCard">
      <q-card>
        <q-bar class="bg-grey-9 text-white q-px-md q-py-lg">
          <q-icon name="slow_motion_video" color="secondary" size="md" />
          <div class="text-h6">Emoji Keyboard buy JoyPixel&trade;</div>
          <q-space></q-space>
          <q-btn icon="close" flat round dense v-close-popup></q-btn>
        </q-bar>

        <q-card-section class="q-mb-lg">
          <div class="text-h5">Auto-Copy</div>
          <p class="text-subtitle-1 text-grey">Copy emoji to clipboard as you click on them</p>
          <q-btn-toggle
            v-model="autoCopy"
            toggle-color="secondary"
            text-color="text-grey"
            color="white"
            :options="autoCopyOptions"
          ></q-btn-toggle>
        </q-card-section>

        <q-card-section class="q-mb-lg">
          <div class="text-h5">Panel Icon Size</div>
          <p class="text-subtitle-1 text-grey">Size of the emoji icons within this extension panel.</p>
          <q-btn-toggle
            v-model="iconSize"
            toggle-color="secondary"
            text-color="text-grey"
            :options="iconSizeOptions"
          ></q-btn-toggle>
        </q-card-section>

        <q-card-section class="q-mb-lg">
          <div class="text-h5">Panel Display</div>
          <p class="text-subtitle-1 text-grey">Panel Display type (re-open for updated display)</p>
          <q-btn-toggle
            v-model="panelDisplay"
            toggle-color="secondary"
            text-color="text-grey"
            color="white"
            :options="panelDisplayOptions"
          ></q-btn-toggle>
        </q-card-section>

        <q-card-section class="q-mb-lg">
          <div class="text-h5">Recents</div>
          <p class="text-subtitle-1 text-grey">Number of recently used emoji to display</p>
          <q-btn-toggle
            v-model="recents"
            toggle-color="secondary"
            text-color="text-grey"
            :options="recentsOptions"
          ></q-btn-toggle>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
export default {
  name: 'options',
  data () {
    return {
      modalCard: false,
      autoCopy: 'on',
      iconSize: 'normal',
      panelDisplay: 'undocked',
      recents: '30',
      autoCopyOptions: [
        { label: this.$t('pages.options.on'), value: 'on' },
        { label: this.$t('pages.options.off'), value: 'off' }
      ],
      iconSizeOptions: [
        { label: this.$t('pages.options.small'), value: 'small' },
        { label: this.$t('pages.options.normal'), value: 'normal' },
        { label: this.$t('pages.options.large'), value: 'large' }
      ],
      panelDisplayOptions: [
        { label: this.$t('pages.options.docked'), value: 'docked' },
        { label: this.$t('pages.options.undocked'), value: 'undocked' }
      ],
      recentsOptions: [
        { label: this.$t('pages.options.none'), value: 'none' },
        { label: '10', value: '10' },
        { label: '20', value: '20' },
        { label: '30', value: '30' },
        { label: '40', value: '40' },
        { label: '50', value: '50' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped></style>
