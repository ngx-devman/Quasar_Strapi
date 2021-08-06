<template>
  <div class="user-content">
    <div class="text-h6">Content</div>
    <dialog-form
      :schema="$app.user.settings.content['schema']"
      :uiSchema="$app.user.settings.content['ui-schema']"
      @addItem="(model) => onAddNewItem({ type: userContent[tab].type, model} )"/>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab v-for="(content, index) in userContent" :name="index" :label="content.label" :key="index"/>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel  v-for="(content, index) in userContent" :name="index" :key="index">
          <component :is="currentTabComponent" :content="content"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import UserContentVideos from './contentTypes/videos'
import UserContentTables from './contentTypes/tables'
import UserContentGrids from './contentTypes/grids'
import DialogForm from './DialogForm'
export default {
  name: 'user-content',
  components: { UserContentVideos, UserContentTables, UserContentGrids, DialogForm },
  data () {
    return {
      tab: 0,
      userContentActivation: {},
      headers: { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
    }
  },
  computed: {
    ...mapGetters({
      userContent: 'config/getUserContent'
    }),
    currentTabComponent () {
      return `user-content-${this.userContent[this.tab].type}s`
    }
  },
  mounted () {
    this.getUserContentActivation()
    if (this.userContentActivation && this.userContentActivation.data) {
      this.setUserContent(this.userContentActivation.data)
    } else {
      this.createContentActivation()
    }
  },
  methods: {
    ...mapMutations({
      addItem: 'config/addUserContentItem',
      setUserContent: 'config/setUserContent'
    }),
    getUserContentActivation () {
      this.userContentActivation = this.$app.user.activations.length && this.$app.user.activations.filter(a => {
        return a.settings.type === 'content'
      })[0]
    },
    onAddNewItem (payload) {
      this.addItem(payload)
      this.updateUserContent()
    },
    async createContentActivation () {
      this.disabled = true
      try {
        const data = {
          settings: { 'type': 'content' },
          data: this.userContent,
          user: this.$app.user.id
        }
        const result = await this.$axios.post(`${this.$config.server}activations`, data, this.headers)
        result.data.user = `${this.$app.user.id}`
        this.$app.user.activations.push(result.data)
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
    },
    async updateUserContent () {
      this.disabled = true
      try {
        this.getUserContentActivation()
        const data = { ...this.userContentActivation, data: this.userContent }
        await this.$axios.put(`${this.$config.server}activations/${this.userContentActivation.id}`, data, this.headers)
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
  }
}
</script>

<style lang="stylus" scoped>

</style>
