<template>
  <div class="body">
    <div class="main">
    <div class="text-center">
     </div>
      <div class="drawer-content column justify-center q-pa-md col-md-4">
      <div class="title"> {{ $t('pages.register.title') }} </div>
      <div class="column">
        <div class="login-input">
          <q-form
            @submit="processRegister"
            class="q-gutter-md">
            <div class="row q-mt-lg">
              <div class="col-12">
                <q-input
                  clear-icon="close"
                  filled
                  tabindex=2
                  color="blue-12"
                  v-model="registerForm.name"
                  ref="name"
                  :label="$t('pages.register.name')"
                  class="q-pa-xs"
                  :rules="[
                    val => val !== null && val !== '' || $t('pages.register.name_note')
                  ]"
                />
              </div>
            </div>
            <div class="row q-mt-lg">
              <div class="col-12">
                <q-input
                  clear-icon="close"
                  filled
                  ref="email"
                  tabindex=3
                  type="email"
                  color="blue-12"
                  v-model="registerForm.email"
                  :label="$t('pages.register.email')"
                  class="q-pa-xs"
                  :rules="[
                    val => val !== null && val !== '' && checkEmail(val) || $t('pages.register.email_note')
                  ]"
                />
              </div>
            </div>
            <div class="row q-my-lg">
              <div class="col-12">
              <q-input
                class="q-pa-xs"
                v-model="registerForm.password"
                tabindex=4
                ref="password"
                filled :type="isPwd ? 'password' : 'text'"
                :label="$t('pages.register.password')"
                :rules="[
                    val => val !== null && val !== '' || $t('pages.register.password_note')
                  ]"
                >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              </div>
            </div>
          </q-form>
        </div>
      </div>
      <q-btn flat class="sign-in full-width" @click="processRegister"> {{$t('pages.register.title')}} </q-btn>
      <div class="sign-up-btn">
        <q-btn flat no-caps class="sign-up-btn create-account full-width"
          color="primary"
          v-close-popup
          @click="userLogin"
        > {{ $t('pages.register.haveAnAccount') }} <span> {{ $t('login').toUpperCase() }} </span></q-btn>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isPwd: true,
      successValidationIdentifier: false,
      register: false,
      registerForm: {
        name: '',
        email: '',
        password: ''
      },
      registerErr: '',
      successRegister: false,
      hasToken:
        localStorage.getItem('token') !== null &&
        localStorage.getItem('token') !== ''
          ? 1
          : 0,
      /*eslint-disable */
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,    
    }
  },
  methods: {
    userRegister () {
      this.register = true
      this.$emit('setAction', 'register')
    },
    userLogin () {
      this.$emit('setAction', 'login')
    },
    async processRegister () {
      this.$refs.email.validate()
      this.$refs.name.validate()
      this.$refs.password.validate()
      if (this.$refs.email.hasError || this.$refs.password.hasError || this.$refs.name.hasError) {
        this.successRegister = false
        return false
      }
      var dataObj = {
        'username': this.registerForm.email,
        'email': this.registerForm.email,
        'password': this.registerForm.password,
        'name': this.registerForm.name
      }
      const errorMessage = this.$t('pages.register.emailTaken')
      var self = this
      try {
        await this.$common.timeline.callUserRegister(dataObj).then(user => {
            localStorage.setItem('token', user.jwt)
            self.hasToken = 1
            self.successValidationIdentifier = true
            self.registerErr = ''
            self.$router.go()
        })
      }
      catch (e) {
        self.successRegister = false
        self.registerErr = errorMessage
      }
    },
    checkEmail (v) {
      const pattern = /^\w+([._-]?\w+)*@\w+([._-]?\w+)*(\.\w{2,5})+$/
      return pattern.test(v)
    }
  },
  computed: {
    required () {
      if (this.registerForm.email !== '' && typeof this.registerForm.email !== 'undefined') {
        if (this.reg.test(this.registerForm.email)) {
          return true
        } else {
          return false
        }
      }
      return false
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-logo
    width 280px
.pt-custom
  padding-top 0
.drawer-content
  height 100%
  max-width 600px
  margin auto
  background-color white
  padding 60px
.body
  width 100%
  float left
  transition .3s
.gender
  padding 0
.q-field__native
  background-color green !important
.q-field__native
  border 1px solid gray
  border-radius 10px
  background #dbdbdb
.q-field__native
  background-color red
.sing-in-btn
  display flex
  align-items center
  justify-content space-between
.input-label
  font-size 16px
  font-weight 400
  margin-bottom: 0
  color #828282
  position: relative
.g-signin-button
  display inline-block
  padding 4px 50px
  border-radius 3px
  background-color #3c82f7
  color #fff
  box-shadow 0 3px 0 #0f69ff
  width: 224px
.drawer-content
  display block
.sign-up-btn
  color #828282 !important
.forgot-link
  font-size 15px
  color #3dc5f7
  margin-left 5px
  border-left 2px solid #bebebe
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
 .or-sec-line hr
  padding 0
  margin 0
.or-sec-line span
  background #fff !important
  width 40px
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
  font-size 18px
  color #fff
  margin-bottom 15px
.btn-facebook a.btn-lg-size
  background #3b5998
  width 100%
  text-align center
  display block
  border-radius 10px
  text-decoration none
.btn-google a.btn-lg-size,
.btn-facebook a.btn-lg-size
  padding 15px 20px
.btn-lg-size i
  padding: 0 5px
.btn-twitter a.btn-lg-size
  background: #3cf
  width 100%
  text-align center
  display block
  border-radius 10px
  padding 10px
  text-decoration none
.btn-google a.btn-lg-size
  background #dc4a38
  width 100%
  text-align center
  display block
  border-radius 10px
  text-decoration none
.or-sec-line
  position relative
  text-align center
  padding: 30px 0
.title
  font-weight 800
  font-size 36px
  color #1d76d2
  text-align center
  text-transform uppercase
.intro
  font-size 0
  color #fff
  padding-bottom 0
  text-align center
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
#app
  display flex
  flex-direction column
  align-items flex-start
.information
  margin: auto
  display: flex
  flex-direction: column
.well
  background-color rgb(191, 238, 229)
  margin auto
  padding 50px 50px
  border-radius 20px
.login
  width: 200px
  margin: auto
.list-item:first-child
  margin: 0
.list-item
  display: flex
  align-items: center
  margin-top: 20px
.button
  margin: auto
@media(max-width:600px)
  .sign-up-btn
   margin-bottom 10px
  .p-left
    padding-left 0
  .title
    padding-top 30px
  .p-right
    padding-right 0
  .pt-custom
    padding-top 15px
  .drawer-content
    padding 0 30px !important
    margin-left 15px
    margin-right 15px
</style>

