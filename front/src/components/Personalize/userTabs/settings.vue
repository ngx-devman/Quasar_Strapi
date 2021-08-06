<template>
  <q-page-container>
    <div class="q-pa-md row justify-center">
      <div class="settings-card">
        <q-list>
          <q-item class="q-pb-none row items-center">
            <div class="text-bold text-grey">{{ $t('pages.user_settings.general') }}</div>
          </q-item>

          <q-card>
            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('pages.user_settings.autoPlay') }}</q-item-label>
                <q-item-label caption>{{ $t('pages.user_settings.autoPlay_caption') }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle @input="updateSettings" color="primary" v-model="notifications" val="autoPlay"></q-toggle>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('pages.user_settings.mute') }}</q-item-label>
                <q-item-label caption>{{ $t('pages.user_settings.mute_caption') }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle @input="updateSettings" color="primary" v-model="notifications" val="mute"></q-toggle>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('pages.user_settings.foo') }}</q-item-label>
                <q-item-label caption>{{ $t('pages.user_settings.foo_caption') }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle @input="updateSettings" color="primary" v-model="notifications" val="foo"></q-toggle>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('pages.user_settings.hideAnnouncements') }}</q-item-label>
                <q-item-label caption>{{ $t('pages.user_settings.hideAnnouncements_caption') }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle @input="updateSettings" color="primary" v-model="notifications" val="hideAnnouncements"></q-toggle>
              </q-item-section>
            </q-item>
          </q-card>

          <q-item class="q-pb-none row items-center">
            <div class="text-bold text-grey">Whisper</div>
          </q-item>

          <q-card>
            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>{{ $t('pages.user_settings.enabled') }}</q-item-label>
                <q-item-label caption>{{ $t('pages.user_settings.enabled_caption') }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle @input="updateSettings" color="primary" v-model="notifications" val="enabledwhisper"></q-toggle>
              </q-item-section>
            </q-item>
          </q-card>

          <q-item class="q-pb-none row items-center">
            <div class="text-bold text-grey">{{ $t('pages.user_settings.languageTitle') }}</div>
          </q-item>
          <q-card>
            <q-item tag="label">
              <q-item-section>
                <q-select @input="updateSettings" class="q-mt-sm" v-model="language" :options="options" :label="$t('pages.user_settings.language')" />
              </q-item-section>
            </q-item>
          </q-card>
          <!-- <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('pages.user_settings.new_offer') }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle @input="updateSettings" color="primary" v-model="notifications" :val="$t('pages.user_settings.new_offer_value')"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('pages.user_settings.chat_alert') }}</q-item-label>
              <q-item-label caption>{{ $t('pages.user_settings.chat_alert_caption') }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle @input="updateSettings" color="primary" v-model="notifications" :val="$t('pages.user_settings.chat_alert_value')"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('pages.user_settings.announcement') }}</q-item-label>
              <q-item-label caption>{{ $t('pages.user_settings.announcement_caption') }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle @input="updateSettings" color="primary" v-model="notifications" :val="$t('pages.user_settings.announcement_value')"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('pages.user_settings.chat_alert') }}</q-item-label>
              <q-item-label caption>{{ $t('pages.user_settings.chat_alert_caption') }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle @input="updateSettings" color="primary" v-model="notifications" :val="$t('pages.user_settings.chat_alert_value2')"></q-toggle>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('pages.user_settings.announcement') }}</q-item-label>
              <q-item-label caption>{{ $t('pages.user_settings.announcement_caption') }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle @input="updateSettings" color="primary" v-model="notifications" :val="$t('pages.user_settings.announcement_value2')"></q-toggle>
            </q-item-section>
          </q-item> -->
        </q-list>
      </div>
    </div>
  </q-page-container>
</template>

<script>
export default {
  name: 'settings',
  components: {},
  data () {
    return {
      notifications: [],
      language: { label: this.$t('pages.user_settings.lang_en_us'), value: 'en_us' },
      options: [
        { label: this.$t('pages.user_settings.lang_en_us'), value: 'en_us' },
        { label: this.$t('pages.user_settings.lang_es'), value: 'es' }
      ]
    }
  },
  mounted () {
    if (this.$app.user.settings) {
      const { notifications, language } = this.$app.user.settings
      this.notifications = notifications
      this.language = language
    }
  },
  methods: {
    async updateSettings () {
      const user = {
        settings: {
          notifications: this.notifications,
          language: this.language
        }
      }
      try {
        const res = await this.$common.timeline.updateUserProfile(user, this.$app.user.id)
        this.$store.dispatch('config/updateUserProfile', res)
        this.$i18n.locale = this.language.value
        this.$q.notify({
          message: this.$t('pages.user_settings.success'),
          type: 'positive',
          timeout: 2000
        })
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error(e.message)
        return e
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.settings-card {
  // width: 100%;
  width: 550px;
}
</style>
