<template>
 <q-card>
    <q-card-section>
          <div class="text-h6">{{$t('pages.login.title')}}</div>
          <p>{{$t('pages.login.subheading')}}</p>
        </q-card-section>
        <q-card-section>
          <template v-if="regStatus === 'creating'">
            {{ $t('pages.register.creating') }}
          </template>
          <template v-else-if="regStatus === 'success'">
            {{ $t('pages.register.success') }}
          </template>
          <template v-else-if="regStatus === 'failed'">
            {{ $t('pages.register.emailTaken') }}
          </template>
        </q-card-section>
        <q-card-section>
          <q-splitter v-model="splitterModel" style="height: 336px">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-primary">
                <q-tab
                  v-for="(auth, index) in authorizationMethods"
                  :key="'authTab' + index"
                  :name="auth"
                  :icon="$t(`pages.login.auth.${auth}.icon`)"
                  @click="activeAuthMethod(auth)"
                />
              </q-tabs>
            </template>
            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
                class="overflow"
              >
                <q-tab-panel name="username">
                  <div class="text-h4 q-mb-md">{{$t('pages.login.login')}}</div>
                  <p class="error">{{loginErr}}</p>
                  <q-input
                    ref="identifier"
                    type="email"
                    bottom-slots
                    v-model="loginForm.identifier"
                    :label="$t('pages.login.identifier')"
                    :rules="[val => !!val && checkEmail(val)|| $t('pages.login.username_note')]"
                    required
                    lazy-rules
                  >
                    <template v-slot:before>
                      <q-icon name="user" />
                    </template>
                    <template v-slot:hint>{{$t('pages.login.username_note')}}</template>
                  </q-input>
                  <q-input
                    ref="password"
                    type="password"
                    bottom-slots
                    v-model="loginForm.password"
                    :label="$t('pages.login.password')"
                    :rules="[
                      val => (val && val.length >= 6) || $t('pages.login.min_password_length')
                    ]"
                    lazy-rules
                  >
                    <template v-slot:before>
                      <q-icon name="security" />
                    </template>
                    <template v-slot:hint>{{$t('pages.login.password_note')}}</template>
                    <template v-slot:append>
                      <q-btn round dense flat icon="visibility" />
                    </template>
                  </q-input>
                </q-tab-panel>
                <q-tab-panel
                  v-for="(auth, index) in authorizationMethods"
                  :key="'authTab' + index"
                  :name="auth"
                >
                 <!-- <div class="text-h5 q-mb-md">{{$t(`pages.login.auth.${auth}.heading`)}}</div> -->
                  <div class="btn-facebook q-mx-md round-borders">
              <a href="#" class="btn-lg-size" @click="signInWithFb">
                <q-icon name="fab fa-facebook-f"></q-icon>
                <span class="q-px-sm">{{ $t('pages.login.login_with_fb')}}</span>
              </a>
            </div>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('pages.register.title')"
            v-if="this.activeLoginMethod === 'username'"
            color="primary"
            v-close-popup
            @click="userRegister"
          />
          <q-btn
            flat
            :label="$t('pages.login.ok')"
            color="primary"
            v-if="isLogin"
            v-close-popup="successValidationIdentifier"
            @click="processLogin"
          />
        </q-card-actions>
  </q-card>
</template>

<script>
import state from '../../store/config/state'
export default {
  props: ['regStatus'],
  data () {
    return {
      loginForm: {
        identifier: '',
        password: ''
      },
      loginErr: '',
      tab: 'username',
      isLogin: true,
      authorizationMethods: [
        'username'
        // 'google',
        // 'facebook'
      ],
      activeLoginMethod: 'username',
      successValidationIdentifier: false,
      hasToken:
        localStorage.getItem('token') !== null &&
        localStorage.getItem('token') !== ''
          ? 1
          : 0,
      register: false,
      /*eslint-disable */
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      splitterModel: 20
    }
  },
  methods: {
    activeAuthMethod (auth) {
      this.activeLoginMethod = auth
    },
    processLogin () {
      if (this.activeLoginMethod === 'username') {
        this.$refs.identifier.validate()
        this.$refs.password.validate()
        if (this.$refs.identifier.hasError || this.$refs.password.hasError) {
          this.successValidationIdentifier = false
        } else {
          this.successValidationIdentifier = true
        }
        var dataObj = {
          'identifier': this.loginForm.identifier,
          'password': this.loginForm.password
        }
        var self = this
        this.$common.timeline.callUserLogin(dataObj)
          .then(user => {
            self.loginErr = ''
            localStorage.setItem('token', user.jwt)
            self.hasToken = 1
            self.successValidationIdentifier = true
            window.location.reload()
          })
          .catch(error => {
            console.log(error)
            self.successValidationIdentifier = false
            self.loginErr = self.$t('pages.login.incorrect_detail')
          })
      } else if (this.activeLoginMethod === 'google') {
        this.signinWithGoogle()
      } else if (this.activeLoginMethod === 'facebook') {
        this.signInWithFb()
      }
    },
    signinWithGoogle () {
      let url = state.server + 'connect/google'
      window.location = url
    },
    signInWithFb () {
      let url = state.server + 'connect/facebook'
      window.location = url
    },
    userRegister () {
      this.register = true
      this.$emit('setAction', 'register')
    },
    checkEmail (v) {
      const pattern = /^\w+([._-]?\w+)*@\w+([._-]?\w+)*(\.\w{2,5})+$/
      return pattern.test(v)
    },
  },
  computed: {
    required () {
      if (this.loginForm.email !== '' && typeof this.loginForm.email !== 'undefined') {
        if (this.reg.test(this.loginForm.email)) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
.body
  width 100%
  float left
  transition .3s
.login-logo
  width 260px
.q-page-container
  padding-top 0 !important
  padding-bottom 0 !important
.drawer-content
  max-width 600px
  padding 60px
  margin auto
.input-label
  font-size 16px
  font-weight 400
  margin-bottom 0
  color #828282
  position relative
.g-signin-button
  display inline-block
  padding 4px 50px
  border-radius 3px
  background-color #3c82f7
  color #fff
  box-shadow 0 3px 0 #0f69ff
  width 224px
.sign-up-btn
  color #828282 !important
.forgot-link
  font-size 15px
  color #3dc5f7
  float right
  margin-left 5px
  padding-left 7px
.forgot-link:hover
  cursor pointer
  text-decoration underline
.sign-up-btn .q-btn__content.text-center span
  padding-left 5px
  color #22c5f7
  font-weight bold
.sign-up-btn
  color #fff
.or-sec-line
  color #000
.or-sec-line hr
  padding 0
  margin 0
.or-sec-line span
  background #fff !important
  width 40px
  color #4c4c4c
  text-transform uppercase
  height 40px
  display grid
  margin auto
  border-radius 100%
  align-items center
  margin-top -20px
.form-group input.form-control.input
  width 100%
  padding 10px 10px 10px 18px
  border-radius 10px
  border 2px solid green
  margin-bottom 15px
.btn-lg-size
  width 100%
  text-align center
  font-size 14px
  color #fff
  margin-bottom 15px
.btn-facebook a.btn-lg-size
  background #3b5998
  width 100%
  text-align center
  display block
  text-decoration none
.btn-google a.btn-lg-size,
.btn-facebook a.btn-lg-size
  padding 15px 20px
.btn-lg-size i
  padding 0 5px
.btn-twitter a.btn-lg-size
  background #3cf
  width 100%
  text-align center
  display block
  border-radius 10px
  padding 10px
  text-decoration none
.btn-google a.btn-lg-size
  background: #dc4a38
  width: 100%
  text-align center
  display block
  text-decoration none
.or-sec-line
  position: relative
  text-align: center
  padding 30px 0
.title
  font-weight 800
  font-size 36px
  color #1d76d2
  padding-bottom 20px;
  text-align: center;
  text-transform uppercase
.q-btn
  padding 10px 0 10px 0
.sign-in
  background-color #828282
  color white
  margin-top 20px
  margin-bottom 10px
.sign-up
  color #333333
  background-color white
@media  only screen and (max-width:600px)
  .sign-up-btn
   margin-bottom -10px
  .sign-in-btn .btn-google a.btn-lg-size,
  .sign-in-btn .btn-facebook a.btn-lg-size
    padding 15px 8px
    font-size 16px
  .sign-up-btn
  margin-bottom -10px
  .sign-in-btn
    flex-direction column
  .drawer-content
    padding 30px
    margin-left 15px
    margin-right 15px
@media  only screen and (max-width:480px)
  .sign-in-btn .btn-google a.btn-lg-size,
  .sign-in-btn .btn-facebook a.btn-lg-size
    padding: 11px
    font-size 15px
  .q-field--filled .q-field__control
    height 42px !important
  .q-field__control
    height 40px !important
  .or-sec-line
    padding 20px 0
  .forgot-link
    margin-left 0
    border 0
    padding-left 3px
</style>
