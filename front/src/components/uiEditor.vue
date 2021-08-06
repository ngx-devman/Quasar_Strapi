<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor v-model="editor" min-height="5rem" @input="htmlToJson"
      ref="editor"
      :toolbar="toolbar"
    >
          <template v-slot:component>
        <q-btn-dropdown
          dense no-caps
          ref="component"
          no-wrap
          unelevated
          color="white"
          text-color="black"
          label="Component"
          size="sm"
        >
          <q-list dense>
            <q-item tag="label" clickable @click="add('Area')">
              <q-item-section side>
                <q-icon name="mail" />
              </q-item-section>
              <q-item-section>Area</q-item-section>
            </q-item>
            <q-item tag="label" clickable @click="add('Input')">
              <q-item-section side>
                <q-icon name="title" />
              </q-item-section>
              <q-item-section>Input</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

    </q-editor>

    <q-card flat bordered>
      <q-card-section>
        <h5>JSON</h5>
        <debug :json="processed" :level="9" />
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section>
        <div ref="rendered" v-html="editor"></div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// This goes through an HTML element and maps it to JSON Schema form...
function recurse (el) {
  var tag = {}
  tag['component'] = el.tagName.toLowerCase() // The component name

  // Go through each attribute...
  let fieldOptions = {}
  let props = {}
  for (let i = 0; i < el.attributes.length; i++) {
    var attr = el.attributes[i]
    // Add class names as an array...
    if (attr.name === 'class') {
      fieldOptions.class = attr.value.split(' ')
    } else {
      // Handle props...
      // Don't store Vue scope data attributes...
      if (!attr.name.startsWith('data-v-')) props[attr.name] = attr.value
    }
  }
  // Add inner text if it exists...
  if (el.innerText) {
    fieldOptions.domProps = { innerText: el.innerText }
  }
  // Add props if they exist...
  if (Object.keys(props).length > 0) {
    tag.fieldOptions.props = props
  }

  // Save field options if they exist...
  if (Object.keys(fieldOptions).length > 0) {
    tag.fieldOptions = fieldOptions
  }

  let children = []
  // Go through all children...
  for (let i = 0; i < el.children.length; i++) {
    children.push(recurse(el.children[i]))
  }
  // If children exist, add them...
  if (children.length > 0) tag.children = children
  return tag
}

export default {
  data () {
    return {
      editor: '',
      processed: '',
      lastProcessed: null,
      // The editor toolbar...
      toolbar: [
        ['undo', 'redo'],
        // Formatting...
        [{
          label: this.$q.lang.editor.formatting,
          icon: this.$q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }],
        // Standard stuff...
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        [{
          label: this.$q.lang.editor.align,
          icon: this.$q.iconSet.editor.align,
          fixedLabel: true,
          list: 'only-icons',
          options: ['left', 'center', 'right', 'justify']
        }],
        ['quote', 'hr', 'link'],
        ['unordered', 'ordered', 'outdent', 'indent'],
        // The component injector...
        ['component'],
        ['viewsource', 'fullscreen']
      ]
    }
  },
  methods: {
    add (name) {
      const edit = this.$refs.editor
      this.$refs.component.hide()
      edit.caret.restore()
      edit.runCmd('insertHTML', `<div class="editor_token">Hello</div>`)
      edit.focus()
    },
    htmlToJson () {
      const changes = JSON.parse(JSON.stringify(this.editor))
      if (changes === this.lastProcessed) {
      } else {
        let parentDiv = this.$refs.rendered
        let ret = recurse(parentDiv)
        if (ret.children) this.processed = ret.children
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
