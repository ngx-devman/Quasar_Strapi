<template>
  <div class="financing">
    <div style="max-width: 350px"></div>
    <q-expansion-item expand-separator label="Current Rates">
      <q-card class="row justify-between">
        <q-card-section>
          <div>Poor Credit:</div>
          <div>13,6% APR</div>
        </q-card-section>

        <q-card-section>
          <div>Good Credit:</div>
          <div>6,25% APR</div>
        </q-card-section>

        <q-card-section>
          <div>Exellent Credit:</div>
          <div>3,125% APR</div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <div class="text-h6 text-purple q-mb-md">Find out your rate below</div>

    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
      <q-input
        ref="name"
        outlined
        v-model="full_name"
        label="Full Name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input outlined v-model="age" ref="age" label="Age (Optional)" class="q-mb-md" />

      <q-input
        ref="email"
        outlined
        v-model="email"
        label="Email*"
        type="email"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your email'
        ]"
      />

      <q-toggle v-model="accept" class="q-my-md" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="red" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>

      <!-- submit dialog -->
      <q-dialog v-model="submit">
        <div class="column items-center text-center">
          <q-avatar icon="check" size="lg" color="green" text-color="white" class="q-mb-md" />
          <div
            class="text-green q-mb-md"
          >Thank you for entering your inforrmation to find out your current rates!</div>
          <div class="text-white">Check your email for a sales person reaching out about your rates.</div>
        </div>
      </q-dialog>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      full_name: '',
      age: '',
      email: '',
      accept: false,
      submit: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.name.validate()
      this.$refs.age.validate()

      if (this.$refs.name.hasError || this.$refs.age.hasError) {
        this.formHasError = true
      } else if (this.accept !== true) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.submit = true
        // this.$q.notify({
        //   icon: 'done',
        //   color: 'positive',
        //   message: 'Submitted'
        // })
      }
    },

    onReset () {
      this.name = null
      this.age = null

      this.$refs.name.resetValidation()
      this.$refs.age.resetValidation()
    }
  }
}
</script>

<style lang="stylus">
.financing .q-dialog__backdrop {
  background: rgba(0, 0, 0, 0.9);
}
</style>
