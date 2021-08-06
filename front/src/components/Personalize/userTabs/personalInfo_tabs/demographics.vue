<template>
  <div>
    <q-card-section>
      <div class="row">
        <div
          v-for="(demographicsInfo, index) in demographics"
          :key="index"
          class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
          :class="$q.screen.gt.sm ? 'q-pr-xl q-pb-md' : 'q-pb-sm'"
        >
          <q-input
            v-if="index != 'relationship'"
            v-model="demographics[index]"
            :label="index === '' ? null : $t(`pages.personal_info.settings.demographics.${index}`)"
          ></q-input>
          <q-select
            v-model="demographics[index]"
            v-else
            :options="$app.user.settings.user.demographics.relationship_options"
            :label="index === '' ? null : $t(`pages.personal_info.settings.demographics.${index}`)"
          ></q-select>
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="row justify-end q-pa-md">
      <q-btn
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
  name: 'demographics',
  props: [],
  data () {
    return {
      demographics: {
        age: null,
        income: null,
        rent: null,
        children: null,
        relationship: []
      },
      disabled: false
    }
  },
  mounted () {
    const {
      age,
      income,
      rent,
      children,
      relationship
    } = this.$app.user.settings.user.demographics
    this.demographics = {
      age,
      income,
      rent,
      children,
      relationship
    }
  },
  methods: {},
  computed: {}
}
</script>

<style lang="stylus" scoped></style>
