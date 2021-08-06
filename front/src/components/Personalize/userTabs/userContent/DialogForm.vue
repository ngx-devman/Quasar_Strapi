<template>
  <div>
    <q-btn class="q-my-md" dense label="Add new item" @click="isDialogShowed = true"/>
    <q-dialog v-model="isDialogShowed" @before-show="onBeforeDialogShow">
      <q-card>
        <q-card-section>
          <vue-form-json-schema
            v-model="model"
            :schema="schema"
            :ui-schema="uiSchema"
            :components="components"
            @validated="onValidated"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" :disable="!isValidated" v-close-popup @click="onAddBtnClick"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { QInput, QSelect, QColor } from 'quasar'
import VueFormJsonSchema from 'vue-form-json-schema/dist/vue-form-json-schema.esm.js'
export default {
  props: ['schema', 'uiSchema'],
  name: 'dialog-form',
  components: { VueFormJsonSchema },
  data () {
    return {
      isDialogShowed: false,
      components: {
        'q-input': QInput,
        'q-color': QColor,
        'q-select': QSelect
      },
      isValidated: false,
      model: {}
    }
  },
  methods: {
    onBeforeDialogShow () {
      this.model = {}
    },
    onValidated (validation) {
      this.isValidated = validation
    },
    onAddBtnClick () {
      this.$emit('addItem', this.model)
    }
  }
}
</script>
