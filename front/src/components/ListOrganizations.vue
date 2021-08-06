<template>
    <div class="Organization">
        <div class="q-pa-md">
            <div v-for="organization in organizations" :key="organization.id">
                {{organization.id}} - {{ organization.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ListOrganizations',
  data () {
    return {
      organization: []
    }
  },
  async mounted () {
    try {
      var result = await this.$axios({
        method: 'GET',
        url: 'https://api-dev.sourcesync.io/graphql',
        data: {
          query: `
                        {
                            organizations {
                                organization {
                                    id,
                                    name,
                                    description
                                }
                            }

                        }
                    `
        }
      })
      this.organization = result.data.data.organization
    } catch (error) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(error)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
