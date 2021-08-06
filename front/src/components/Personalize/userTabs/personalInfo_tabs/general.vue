<template>
  <div>
    <div class="row justify-center no-wrap">
      <q-card-section>
        <q-avatar class="bg-grey-5" :size="$q.screen.gt.sm ? '10vmin' : '5rem'">
          <img v-if="user.photo && user.role.type !== 'public'" :src="user.photo.url" />
          <q-icon v-else name="person" color="white" size="3rem" />
          <q-btn
            round
            color="primary"
            icon="add"
            :size=" $q.screen.gt.sm ? '0.8vmax' : '0.7rem'"
            class="absolute"
            style="bottom: 5px; right: 5px; transform: translateX(50%);"
          />
        </q-avatar>
      </q-card-section>
      <q-card-section name="myAccount">
        <div
          class="q-mb-md"
          :class="$q.screen.gt.sm ? 'text-h4 ' : 'text-h6 q-pt-md'"
        >{{ $t('pages.personal_info.title') }}</div>
        <div class="row">
          <div
            v-for="(profiles,index) in profile"
            :key="index"
            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
            :class="$q.screen.gt.sm ? 'q-pr-xl q-pb-md' : 'q-pb-sm'"
          >
            <q-input
              v-model="profile[index]"
              :label="index === 'name' ? $t('pages.personal_info.fullname') : $t(`pages.personal_info.${index}`)"
              :placeholder="index === 'name' ? 'John Doe' : null"
            ></q-input>
          </div>
        </div>
      </q-card-section>
    </div>

    <!-- Organizations -->
    <div
      v-if="$user.can('update', 'distributions', $app.session.distribution) && user.organizations.length > 0"
    >
      <div
        :class="$q.screen.gt.sm ? 'text-h6 q-ma-md' : 'text-subtitle1 text-bold q-pa-sm'"
      >{{ $t('pages.personal_info.org.title') }}</div>
      <div class="row fit">
        <div
          v-for="organization in user.organizations"
          :key="organization.id"
          :class="$q.screen.gt.sm ? 'q-pr-md q-pb-md' : 'q-pb-sm'"
          class="full-height col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12"
        >
          <q-card push v-ripple:grey-8>
            <q-card-section horizontal>
              <q-card-section class="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-xs-5 flex flex-center">
                <q-img class="rounded-borders" :ratio="1" :src="organization.mainImage.url" />
              </q-card-section>
              <q-card-section>
                <div class="column">
                  <div class="q-mt-md text-weight-bold">{{organization.Name}}</div>
                  <div>{{ $t('pages.personal_info.org.username') }}: {{organization.username}}</div>
                  <div>{{ $t('pages.personal_info.org.role') }}: {{organization.role}}</div>
                  <div>{{ $t('pages.personal_info.org.expires') }}: {{organization.role}}</div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <q-card-actions class="row justify-end q-pa-md">
      <q-btn
        @click="updateUserProfile"
        color="primary"
        :class="$q.screen.lt.sm ? 'full-width' : ''"
        :disable="disabled"
        icon="fas fa-save"
        :label="$t('pages.personal_info.save')"
      ></q-btn>
    </q-card-actions>
  </div>
</template>

<script>
export default {
  name: 'general',
  props: ['value', 'user'],
  data () {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      disabled: false
    }
  },
  mounted () {
    const { name, email, phone, city, state, zip, country } = this.$app.user
    this.profile = {
      name: typeof name !== 'object' ? name : '',
      email,
      phone,
      city,
      state,
      zip,
      country
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e)
    },
    // Since everything we output is sent to a state machine with history,
    // you can increase your undo/redo steps & memory efficency by only
    // calling updateState when something meaningful happened (i.e. NOT
    // calling it every time the user presses a key, but maybe when they
    // only press enter, or navigate away from the element)
    updateState (key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    },
    async updateUserProfile () {
      this.disabled = true
      try {
        const res = await this.$common.timeline.updateUserProfile(
          this.profile,
          this.$app.user.id
        )
        this.$store.dispatch('config/updateUserProfile', res)
        this.$q.notify({
          message: this.$t('pages.personal_info.success'),
          type: 'positive'
        })
        this.disabled = false
      } catch (e) {
        this.disabled = false
        /* eslint no-console: "error" */
        console.error(e.message)
        return e
      }
    }
  },
  computed: {}
}
</script>

<style lang="stylus" scoped></style>
