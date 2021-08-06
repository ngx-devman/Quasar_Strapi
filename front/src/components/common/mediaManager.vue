<template>
  <div class="fit">
    <q-spinner v-if='!loaded' color="primary" size="3em"/>
    <q-card v-else flat class="bg-grey-2">
      <q-tabs v-model="tab" inline-label align="left" class="text-grey" active-color="grey-9">
        <q-tab name="upload" icon="get_app" label="Upload"></q-tab>
        <q-tab v-if='images.length >= 1' name="library" icon="insert_photo" label="Library"></q-tab>
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel class="bg-grey-2" name="upload">
          <div class="q-gutter-sm bg-grey-2 row justify-center">
            <q-uploader
              :url="$config.server + 'user/media'"
              label="Upload"
              color="grey-2"
              text-color="grey-10"
              style="width: 100%;"
              :headers="[{name: 'Authorization', value: 'Bearer ' + token}]"
              class="full-height"
              :field-name="(file) => 'files.files'"
              :form-fields="[{name: 'data', value: '{}'}]"
              @uploaded="(info) => mediaUploaded(info)"
            >
             <template v-slot:list="scope">
        <q-list separator>

          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>

        </q-list>
      </template>
            </q-uploader>
          </div>
          <div v-if='images.length < 1' class='text-center q-pa-md'>There are currently no images uploaded.</div>
        </q-tab-panel>

        <q-tab-panel class="bg-grey-2" name="library">
          <div class="q-pa-md">
            <div class="q-col-gutter-md row items-start">
              <div class="col-xs-12 col-sm-6 col-md-4" v-for="(img, index) in images" :key="index">
                <q-card dark class="my-card">
                  <q-img :src="img.provider === 'local' ? host + img.url : img.url" style="height: 10rem;" contain>
                    <div v-if="img.related && img.related.length > 0">
                      Used <span v-if="img.related[0].name">in "{{img.related[0].name}}"</span><span v-else> as a logo</span>
                    </div>
                    <q-btn
                      color="grey-10"
                      text-color="grey-2"
                      size=".75rem"
                      round
                      icon="more_vert"
                      class="absolute-top-right q-ma-xs"
                    >
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable @click="setImage(index)">
                            <q-item-section>Set</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section @click="removeImage(index, img)">Delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-img>
                </q-card>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['value', 'label', 'types'],
  async mounted () {
    await this.fetchImages()
  },
  data () {
    return {
      tab: 'upload',
      images: [],
      loaded: false,
      host: this.$config.server.slice(0, this.$config.server.length - 1),
      token: localStorage.getItem('token')
    }
  },
  methods: {
    async fetchImages () {
      const result = await this.$axios.get(`${this.$config.server}user/media?type=image`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      const results = JSON.stringify(result.data)
      if (results === '{}' || results === '[]') {
        this.images = []
        this.loaded = true
        return
      }
      // Replace localhost stuff (remove after development for a tiny speed boost to users looking at the media library)...
      result.data.files.forEach(item => { item.url = item.url.replace('localhost:1337', 'api-dev.source.tools') })
      // Return the image list...
      this.images = result.data.files
      this.loaded = true
      return result
    },
    setImage (index, type) {
      this.$emit('changeImage', this.images[index], this.types)
    },
    onHide () {
      this.$emit('input', false)
    },
    removeImage (index, img) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to remove ${img.name}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        let toDelete = index
        this.images = [ ...this.images.slice(0, toDelete), ...this.images.slice(toDelete + 1) ]
      })
    },
    async mediaUploaded (info) {
      await this.fetchImages()
    }
  }
}
</script>

<style lang="stylus" scoped>
/deep/.q-uploader__list {
  display: flex;

  .q-uploader__file {
    margin: 10px;
  }
}
</style>
