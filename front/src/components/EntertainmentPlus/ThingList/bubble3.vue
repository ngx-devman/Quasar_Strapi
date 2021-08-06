<template>
  <div class="q-my-md bubble-list-item-container cursor-pointer transition">
    <div class="row reverse items-center q-mx-sm no-wrap" @click="$emit('detail', index)">
      <q-list>
        <q-item class="rounded-borders" :class="`bg-`+ color" v-ripple>
            <div class="row" :class="(direction === 'right') ? 'reverse-item' : ''">
                <q-item-section avatar>
                    <q-avatar size="50px" :class="{'rotate-image': animation}">
                        <img :src="thing.dataObject.mainImageUrl" />
                    </q-avatar>
                </q-item-section>

                <q-item-section :class="{'grow-text': animation}">
                    <q-item-label :class="`text-` + textColor">{{ thing.dataObject.name }}</q-item-label>
                    <q-item-label caption lines="2" :class="`text-` + extraTextColor">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>
            </div>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  props: ['thing', 'index'],
  data () {
    return {
      color: 'blue-grey-4',
      direction: 'left',
      textColor: 'white',
      extraTextColor: 'grey-4',
      animation: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.bubble-list-item-container .q-item
    padding 4px 8px
/deep/.reverse-item
  flex-direction row-reverse
  .q-avatar
    margin-right -0.45em
    margin-left 0.2em
</style>
