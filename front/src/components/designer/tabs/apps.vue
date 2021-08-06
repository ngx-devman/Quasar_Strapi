<template>
  <div>
    <q-input
      v-model="searchApps"
      filled
      type="search"
      label="Search apps"
      label-color="grey-7"
      bg-color="white"
    >
      <template v-slot:append>
        <q-icon name="search"></q-icon>
      </template>
    </q-input>

    <div>
      <div class="text-bold q-my-md">Apps and integrations</div>

      <div
        v-mutation="handler1"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop"
      >
        <div class="row items-start q-gutter-md">
          <div
            v-for="(n, index) in 5"
            :key="index"
            :id="'box' + index +1"
            draggable="true"
            @dragstart="onDragStart"
            class="box"
          >
            <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
            <div class="text-caption q-mt-xs">Chat</div>
          </div>
        </div>
      </div>
    </div>
    <!-- drop elements here -->
    <div
      v-mutation="handler2"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover="onDragOver"
      @drop="onDrop"
      class="drop-target rounded-borders overflow-hidden q-mt-md"
    ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchApps: '',
      status1: [],
      status2: []
    }
  },
  methods: {
    handler1 (mutationRecords) {
      this.status1 = []
      for (const index in mutationRecords) {
        const record = mutationRecords[index]
        const info = `type: ${record.type}, nodes added: ${
          record.addedNodes.length > 0 ? 'true' : 'false'
        }, nodes removed: ${
          record.removedNodes.length > 0 ? 'true' : 'false'
        }, oldValue: ${record.oldValue}`
        this.status1.push(info)
      }
    },

    handler2 (mutationRecords) {
      this.status2 = []
      for (const index in mutationRecords) {
        const record = mutationRecords[index]
        const info = `type: ${record.type}, nodes added: ${
          record.addedNodes.length > 0 ? 'true' : 'false'
        }, nodes removed: ${
          record.removedNodes.length > 0 ? 'true' : 'false'
        }, oldValue: ${record.oldValue}`
        this.status2.push(info)
      }
    },

    // store the id of the draggable element
    onDragStart (e) {
      e.dataTransfer.setData('text', e.target.id)
      e.dataTransfer.dropEffect = 'move'
    },

    onDragEnter (e) {
      // don't drop on other draggables
      if (e.target.draggable !== true) {
        e.target.classList.add('drag-enter')
      }
    },

    onDragLeave (e) {
      e.target.classList.remove('drag-enter')
    },

    onDragOver (e) {
      e.preventDefault()
    },

    onDrop (e) {
      e.preventDefault()

      // don't drop on other draggables
      if (e.target.draggable === true) {
        return
      }

      const draggedId = e.dataTransfer.getData('text')
      const draggedEl = document.getElementById(draggedId)

      // check if original parent node
      if (draggedEl.parentNode === e.target) {
        e.target.classList.remove('drag-enter')
        return
      }

      // make the exchange
      draggedEl.parentNode.removeChild(draggedEl)
      e.target.appendChild(draggedEl)
      e.target.classList.remove('drag-enter')
    }
  }
}
</script>

<style lang="stylus" scoped>
.box {
  width: 50px;

  .q-img {
    width: 50px;
    height: 50px;
  }
}

.drag-enter {
  outline-style: dashed;
}

.drop-target {
  height: 400px;
  width: 100%;
  outline-style: dashed;
  display: flex;

  .box {
    margin-right: 5px;
  }
}
</style>
