<template functional>
  <div class="cursor-pointer transition full-width row justify-center" :style="{ background: props.edited.bgColor }" v-on="listeners">
    <q-item clickable v-ripple class="col-12 items-center no-wrap justify-center row q-gutter-x-md">
      <q-avatar v-if="props.icon" :size="`${props.edited.imageSize}px`" rounded>
        <q-img class="fit" contain :src="props.icon"/>
      </q-avatar>
      <q-separator class="col-2" vertical style="height:50%;align-self:center!important;" :style="{ background: props.edited.separatorColor }" size="3px" />
      <div class="col-5" middle>
        <q-item-label lines="2" :style="{ color: props.edited.textColor }">
          <span class="text-weight-medium" v-if="props.text">{{props.text}}</span>
        </q-item-label>
      </div>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'RigidTemplateV2',
  props: {
    icon: String,
    text: String,
    color: String,
    edited: Object
  }
}
</script>
