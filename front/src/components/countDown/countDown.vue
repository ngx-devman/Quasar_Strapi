<template>
    <div class="countDown row justify-center items-center q-pa-md absolute full-height full-width">
        <div class="text-center">
            <q-icon name="card_giftcard" style="font-size: 3em;" class="q-mb-lg"></q-icon>
            <div class="text-h4 text-bold text-uppercase q-mb-lg">Coming soon</div>
            <div class="text-h5 q-mb-md">Our website is under construction, follow us for update now!</div>

            <q-card bordered style="background: transparent" class="q-pa-lg bigger-margin">
                <Countdown deadline="May 22, 2020"></Countdown>
            </q-card>

            <div class="q-mx-auto">
                <q-input rounded outlined v-model="notifyEmail" type="email" label="Email Address" dark>
                    <template v-slot:append>
                        <q-btn rounded color="primary" label="Notify me"></q-btn>
                    </template>
                </q-input>
            </div>
        </div>

    </div>
</template>

<script>
import Countdown from 'vuejs-countdown'

export default {
  components: {
    Countdown
  },
  data () {
    return {
      notifyEmail: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.countDown
    background-image linear-gradient(to right top, #050a37, #003d71, #0074a6, #00afcf, #12ebeb)
    top 0
    left 0
    z-index 9999

.bigger-margin
    margin 60px 0
</style>
