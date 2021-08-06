<template>
  <q-splitter
    class="fit absolute-full cross-frame-tester"
    v-model="splitter"
    after-class="relative-position"
    unit="px"
  >
    <template #before>
      <q-list
        bordered
        class="full-height full-width rounded-borders"
      >
        <q-item
          clickable
          @click="splitter = 5"
        >
          <q-item-section avatar>
            <q-icon name="close" />
          </q-item-section>
          <q-item-section>
            Close
          </q-item-section>
        </q-item>

        <q-expansion-item
          :default-opened="true"
          expand-separator
          label="Target URL"
        >
          <q-card>
            <q-card-section class="column q-col-gutter-md items-end">
              <q-input
                class="full-width"
                label="URL"
                v-model="fields.url"
              />
              <div
                class="q-gutter-x-sm"
              >
                <q-btn
                  label="Go"
                  @click="go(fields.url)"
                  color="primary"
                />
                <q-btn
                  :disable="!url"
                  flat
                  label="Reset"
                  @click="reset"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item

          expand-separator
          label="postMessage"
        >
          <q-card class="col">
            <q-separator />
            <q-card-section>
              <q-field>
                <VJsonEditor
                  :options="{mode: 'code'}"
                  v-model="message"
                />
              </q-field>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                color="primary"
                label="Send Message"
                @click="sendMessage"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          label="playerjs"
        >
          <q-card class="col column">
            <q-separator />
            <q-card-section class="row q-gutter-sm">
              <div class="text-subtitle2">
                Methods
              </div>

              <div
                v-for="( methods, methodType ) in playerjs.methods.value"
                :key="methodType"
              >
                <div
                  class="text-subtitle2"
                >
                  {{ methodType }}
                </div>
                <template v-for="( method ) in methods">
                  <q-btn
                    size="0.8rem"
                    :key="method"
                    :label="method"
                    @click="onPlayerjsMethodClick(method)"
                  />
                </template>
              </div>
            </q-card-section>
            <q-card-section class="row q-gutter-sm">
              <div class="text-subtitle2">
                Events
              </div>
              <template v-for="( event ) in playerjs.events.value">
                <q-toggle
                  class="col-4"
                  :key="event"
                  :label="event"
                  :value="!!playerjs.eventListeners[event]"
                  @input="onToggleInput($event, event)"
                />
              </template>
            </q-card-section>
            <q-card-section class="bg-grey-2">
              <q-scroll-area style="height: 300px;">
                <q-list
                  bordered
                  separator
                >
                  <q-item
                    v-for="(e, i) in receivedEvents"
                    :key="i"
                  >
                    {{ i }}:{{ JSON.stringify(e) }}
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          label="iframe style"
        >
          <q-card class="col">
            <q-separator />
            <q-card-section>
              <q-field>
                <VJsonEditor
                  :options="{mode: 'code'}"
                  v-model="fields.style"
                />
              </q-field>
            </q-card-section>
            <q-separator />
          </q-card>
        </q-expansion-item>
      </q-list>
    </template>
    <template #after>
      <div class="row flex-center fit">
        <iframe
          ref="iframeRef"
          :src="url"
          :style="{...fields.style}"
          allow="autoplay"
        />
      </div>
    </template>
  </q-splitter>
</template>

<script>
// import ResizableGrid from 'components/ResizableGrid'
import VJsonEditor from 'v-jsoneditor'
import pjs from 'player.js'
import { LocalStorage, Notify, Dialog } from 'quasar'
import UserInputDialog from './UserInputDialog'
const LOCAL_STORAGE_KEY = 'sd-ee-demo-cross-domain.fields'
import { ref, reactive, watchEffect, toRefs, computed, nextTick } from '@vue/composition-api'

function usePostMessage (iframeRef, url) {
  const message = reactive({
    context: 'SourceDigital',
    event: 'setMetacontents',
    value: [{
      externalId: 1
    }]
  })

  const targetDomain = computed(() => {
    if (!url) return null
    return (new URL(url)).origin
  })
  function sendMessage () {
    iframeRef.value.contentWindow.postMessage(JSON.stringify(message), targetDomain)
  }
  return { message, sendMessage }
}

function usePlayerJs ({ iframeRef, url }) {
  const player = ref(null)
  const methods = ref([])
  const events = ref([])
  const eventListeners = ref({})

  const receivedEvents = ref([])
  const isPlayerJsReady = ref(false)

  function go (_url) {
    url.value = _url
    nextTick(() => {
      player.value = pjs.Player(iframeRef.value)
      window.crossOriginPlayer = player
      player.value.on('ready', ({ methods: _methods, events: _events }) => {
        methods.value = [...Object.values(_methods)].sort()
        events.value = [...Object.values(_events)].sort()
        eventListeners.value = events.value.reduce((map, item) => {
          map[item] = false
          return map
        }, {})
        isPlayerJsReady.value = true
        Notify.create({ type: 'positive', message: 'PlayerJs is ready...' })
      })
    })
  }

  function reset () {
    methods.value = []
    events.value = []
    isPlayerJsReady.value = false
    eventListeners.value = {}
  }

  function onPlayerjsMethodClick (method) {
    if (method.startsWith('get')) {
      const callback = value => receivedEvents.value.push({ method, value })
      player.value[method] ? player.value[method](callback) : player.value.send({ method }, callback)
    } else if (method.startsWith('set') || method === 'orientation') {
      Dialog.create({ component: UserInputDialog }).onOk((value) => {
        player.value[method] ? player.value[method](value) : player.value.send({ method, value })
      })
    } else player.value[method] ? player.value[method]() : player.value.send({ method })
  }

  function onToggleInput (val, event) {
    if (!val) {
      player.value.off(event, eventListeners.value[event])
      eventListeners.value[event] = null
    } else {
      const callback = (event, (value) => receivedEvents.value.push({ event, value }))
      player.value.on(event, callback)
      eventListeners.value[event] = callback
    }
  }
  const sortedMethods = computed(() => {
    if (!methods.value || methods.value.length === 0) return {}
    return methods.value.reduce((obj, curr) => {
      if (['ADDEVENTLISTENER', 'REMOVEEVENTLISTENER'].includes(curr.toUpperCase())) return obj
      if (curr.startsWith('get')) obj.get.push(curr)
      else if (curr.startsWith('set')) obj.set.push(curr)
      else obj.others.push(curr)
      return obj
    }, { get: [], set: [], others: [] })
  })

  return {
    go,
    reset,
    playerjs: {
      events,
      eventListeners,
      methods: sortedMethods
    },
    receivedEvents,
    onToggleInput,
    onPlayerjsMethodClick,
    isPlayerJsReady
  }
}

export default {
  name: 'CrossFrameTester',
  components: {
    VJsonEditor
    // ResizableGrid
  },
  setup (props) {
    const iframeRef = ref(null)
    const state = reactive({
      splitter: 400,
      drawer: false
    })

    const url = ref(null)
    const fields = reactive(Object.assign({
      url: `http://localhost:${process.env.TARGET_PORT || 8081}`,
      style: { height: '500px', width: '100%', backgroundColor: 'grey' },
      overlay: false
    }, LocalStorage.getItem(LOCAL_STORAGE_KEY)))

    const { reset: pjsReset, ...playerJs } = usePlayerJs({ iframeRef, url })

    function reset () {
      url.value = null
      pjsReset()
    }

    watchEffect(() => {
      LocalStorage.set(LOCAL_STORAGE_KEY, Object.assign({}, LocalStorage.getItem(LOCAL_STORAGE_KEY), fields))
    })

    return {
      iframeRef,
      fields,
      url,
      reset,
      ...usePostMessage(iframeRef, url),
      ...toRefs(state),
      ...playerJs
    }
  }
}
</script>
