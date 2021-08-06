 <template>
  <q-page-container>
    <q-page padding>
       <!-- Profile Edit -->
      <q-card class="text-black">
        <!-- User Background -->
        <div class='bgHeight' :style='userBg'/>
        <q-card-section>
          <q-avatar class="absolute bg-grey-5" :size="$q.screen.gt.sm ? '10vmin' : '5rem'" style="top: 0; left: 20px; transform: translateY(-50%);">
            <img v-if='user.photo && user.role.type !== "public"' :src="user.photo.provider === 'local' ? server + user.photo.url : user.photo.url" />
            <q-icon v-else name='person' color='white' size='3rem'/>
            <q-btn round @click="() => openMediaManager = !openMediaManager" color="primary" icon="add" :size=" $q.screen.gt.sm ? '0.8vmax' : '0.7rem'" class="absolute" style="bottom: 5px; right: 5px; transform: translateX(50%);"/>
          </q-avatar>
        </q-card-section>
        <q-card-section name="myAccount" class='cardPadding'>
          <div class="q-mb-md" :class='$q.screen.gt.sm ? "text-h4 " : "text-h6 q-pt-md"'>{{ $t('pages.personal_info.title') }}</div>
          <div class="row">
            <div v-for='(profiles,index) in profile' :key='index' class='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12' :class='$q.screen.gt.sm ? "q-pr-xl q-pb-md" : "q-pb-sm"'>
              <q-input v-if="index !== 'photo'" v-model="profile[index]" :label="index === 'name' ? $t('pages.personal_info.fullname') : $t(`pages.personal_info.${index}`)" :placeholder="index === 'name' ? 'John Doe' : null"></q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class='row justify-end q-pa-md'>
          <q-btn @click="updateUserProfile" color='primary' :class='$q.screen.lt.sm ? "full-width" : ""' :disable="disabled" icon="fas fa-save" :label="$t('pages.personal_info.save')"></q-btn>
        </q-card-actions>
      </q-card>

    </q-page>
    <q-dialog v-model="openMediaManager" full-width full-height>
      <q-card>
        <MediaManager types='url' @changeImage='setImage'/>
        </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
import MediaManager from 'components/common/mediaManager'
export default {
  name: 'personal-info',
  props: [ 'value', 'user' ],
  components: { MediaManager },
  data () {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        photo: {}
      },
      disabled: false,
      openMediaManager: false,
      server: this.$config.server.slice(0, this.$config.server.length - 1),
      error: undefined
    }
  },
  mounted () {
    const { name, email, phone, city, state, zip, country, photo } = this.user
    this.profile = { name, email, phone, city, state, zip, country, photo }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e)
    },
    setImage (index, type) {
      this.profile.photo = index
      const user = {
        ...this.$app.user,
        photo: {
          url: index.url
        }
      }
      this.$store.dispatch('config/updateUserProfile', user)
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
        const res = await this.$common.timeline.updateUserProfile(this.profile, this.$app.user.id)
        this.$store.dispatch('config/updateUserProfile', res)
        this.$q.notify({
          message: this.$t('pages.personal_info.success'),
          type: 'positive'
        })
        this.disabled = false
      } catch (e) {
        this.disabled = false
        this.error = e
        /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error(e.message)
        return e
      }
    }
  },
  computed: {
    // TODO: Change to appropriate variable when available, for now it's the user's avatar image
    userBg () {
      let bg = this.user.photo ? this.user.photo.provider === 'local' ? this.server + this.user.photo.url : this.user.photo.url : null
      return {
        backgroundImage: `url(${bg})`
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.bgHeight
  width 100%
  height 30vmin
  max-height 600px
  background-color $primary
  background-repeat no-repeat
  background-size cover

@media (max-width 1020px)
  .q-page-container
    padding-left 57px
</style>
