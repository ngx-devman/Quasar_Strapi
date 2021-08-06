<template>
  <div id="SDthingList" :class="classList" class='no-pointer-events q-pt-md row'>
    <!-- Left -->
  <transition-group appear v-if="type === 'overlay'" class="animated col column q-gutter-y-md column items-start" :enter-active-class="animationIn" :leave-active-class="animationOut">
      <thing-item v-for="(thing, index) in (thingsLists.left || [])"
        :key="getBubbleKey(thing, index)"
        class="q-px-sm all-pointer-events"
        :thing="thing"
        :left-icon="true"
        :index="index"
        :type="type"
        :style="$common.get(thing, 'meta.data.settings.preview.style')"
        :seen-ids="seenIds"
        @activationId="activationId"
        @detail="$emit('detail', $event)"
        @fomoCall="fomoCall"
      />
  </transition-group>

    <!-- Right -->
    <transition-group appear class='col animated column q-gutter-y-md' :enter-active-class="animationIn" :leave-active-class="animationOut" :class='type === "overlay" ? "column items-end" : ""'>
      <thing-item v-for="(thing, index) in rightList"
        :key="getBubbleKey(thing, index)"
        class="q-px-sm all-pointer-events"
        :thing="thing"
        :index="index"
        :type="type"
        :style="$common.get(thing, 'meta.data.settings.preview.style')"
        :seen-ids="seenIds"
        @activationId="activationId"
        @detail="$emit('detail', $event)"
        @fomoCall="fomoCall"
      />
    </transition-group>
  </div>
</template>
<script>
import ThingItem from './ThingItem'

export default {
  props: ['things', 'type'],
  debug: { context: 'thingList' },
  data () { return { seenIds: new Set(), activationPosition: null } },
  components: { ThingItem },
  methods: {
    getBubbleKey (thing, index) {
      return `bubble_${thing.id ? thing.id : thing.dataObject.data.externalProductId}_${thing.instanceId || index}`
    },
    // Decide what thing list template to draw on the thing list on videos...
    template (thing) {
      const template = this.$app.settings.layout.things.lists[this.type].template
      return `${template}${thing.version && thing.version >= 2 ? '-v2' : ''}-item`
    },
    // Adds activation IDs to seenIds
    activationId (id) {
      this.debug(id, 'ID')
      this.seenIds.add(id)
    },
    // When fomo is clicked, add id to seenIds and call details
    fomoCall (thing, index, id) {
      this.activationId(id)
      this.$emit('detail', thing, index)
    }
  },
  computed: {
    classList () {
      return this.$app.settings.layout.things.lists[this.type].class
    },
    rightList () {
      return this.type === 'overlay' ? this.thingsLists.right || [] : this.things
    },
    thingsLists () {
      return this.things.reduce((map, item) => {
        const key = item.position || 'right'
        if (!map[key]) map[key] = []
        map[key].push(item)
        return map
      }, {})
    },
    animationIn () {
      if (this.$common.get(this.thingSettings, 'meta.animation.activation.in')) {
        return this.thingSettings.meta.animation.activation.in
      } else {
        return this.$app.settings.meta.animation.activation.in
      }
    },
    animationOut () {
      if (this.$common.get(this.thingSettings, 'meta.animation.activation.out')) {
        return this.thingSettings.meta.animation.activation.out
      } else {
        return this.$app.settings.meta.animation.activation.out
      }
    }
  }
}
</script>
<style lang="stylus">
.black-bg {
  height: 100.5%;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 30em;
  min-width: 18em;
  margin-left: auto;
  z-index: 0;
  padding-bottom: 15%;
  right: -300%;
  top: 0;
  bottom: 40px;
  transition: right 0.7s;
  &:hover {
    right: 0;
  }
}
.black-bg.opened {
  right: 0;
}
.black-bg.alwaysOpen {
  right: 0;
  height: 100%;
  width: 100%;
  padding-bottom: 0;
  z-index: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  animation-name: slideLeft;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;
}
.black-bg.whiteCart {
  right: 0;
  height: 100%;
  width: 100%;
  background: #ffffff;
  border-radius: 0.125rem;
  padding-bottom: 0;
  animation-name: slideLeft;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;
  z-index: 3;
}
.easeIn {
  animation: slideLeft 1s;
  .trey-wrapper  {
    width: 45px;
  }
}
.easeOut {
  animation: slideLeft 1s reverse;
  .trey-wrapper  {
    width: 45px;
    .fomo-description {
      white-space: nowrap;
    }
  }
}
@keyframes slideLeft {
  0% {
    opacity: 0;
    max-height: 0;
    transform: translateX(-3em) scale(0.9);
    margin-top: 0;
    margin-bottom: 0;
  }

  100% {
    opacity: 1;
    max-height: 30vmax;
    transform: translateX(0) scale(1);
  }
}
.bubble-list-item-container {
  font-size: 1.1875em;
}
.bubble-list-item-text {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  border-radius: 0.125rem;
  height: fit-content;
  margin-top: 0.25em;
  text-align: right;

}
.fab-wrapper {
  .bubble-list-item-text {
    position: absolute;
    right: 100%;
  }
}
.bubble-list-item-image img {
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0.125em 0.125em 0.5em black;
}
/deep/ .plyr__progress__container {
  width: 100%;
}
/deep/ .plyr__volume input[type=range] {
  min-width: 73px;
}
/deep/ .plyr--video .plyr__controls {
  padding: 10px 10px 10px 10px;
}
/deep/ .plyr__video-wrapper {
  height: 100%;
  video {
    height: 100%;
  }
}
.contain {
  object-fit: contain;
}
.index-9 {
  z-index: 9;
}
.index-2 {
  z-index: 2;
}
.bigger-padding-bottom {
  padding-bottom: 100px;
}
.rotate-image
  animation rotation 1s normal forwards ease-in-out
@keyframes rotation {
  from {
    transform: rotate(60deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.grow-text
  overflow-y hidden
  p,
  .q-item__label
    animation grow 1s normal forwards ease-in-out
@keyframes grow {
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(0);
  }
}
@media (min-width: 1281px) {
  /deep/.plyr {
    height: 100vh;
  }
}
@media (max-width: 576px) {
  .smaller-mobile {
    font-size: 17px !important;
  }
  .bubble-list-item-image .q-avatar {
    font-size: 50px !important;
  }
  .transparent-container {
    width: auto !important;
  }
  .black-bg {
    max-width: initial;
  }
  .black-bg.whiteCart, .black-bg.alwaysOpen {
    width: 100vw;
    height: 466.2px;
    top: 135%;
    right: 0;
    bottom: -100%;
  }
  /deep/.q-btn--fab .q-btn__wrapper {
    min-height: 40px;
    min-width: 40px;
  }
  /deep/.q-fab__actions.q-fab__actions--up{
    height: 120px;
    overflow-y: auto;
    align-items: flex-end;
    justify-content: flex-start;
    width: 200px;
    right: 0;
    left: auto;
  }
  /deep/ .q-btn--fab-mini .q-btn__wrapper {
      min-height: 30px;
      min-width: 30px;
  }
  /deep/ .q-btn--fab-mini .q-icon {
    font-size: 16px;
  }
  .black-bg.alwaysOpen {
    background: white;
  }
}
@media (max-width: 340px) {
  /deep/.q-fab__actions.q-fab__actions--up{
    height: 90px;
  }
  /deep/.q-btn--fab .q-btn__wrapper {
    min-height: 35px;
    min-width: 35px;
  }
  /deep/.q-fab__actions.q-fab__actions--up {
    height: 70px;
  }
}

// *Re-enable when needed
@media (min-width: 2560px)
  .bubble-list-item-text
    padding 1.5rem
  .bubble-list-item-image .q-avatar
    height 4vmax
    width 4vmax
  .bubble-list-item-container
    margin-bottom 3rem
    margin-right 1rem
  .bubble-list-item-text .text-body1
    font-size 2.5rem
    line-height 3rem!important
</style>
