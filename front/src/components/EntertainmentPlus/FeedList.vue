<template>
  <div class="relative-position index-9 q-pt-xl show-mobile-items">
    <div
      v-for="(thing, index) in things"
      :key="index"
      class="q-my-md bubble-list-item-container cursor-pointer transition"
    >
      <div class="row reverse items-center q-mx-sm no-wrap" @click="$emit('detail', things[index])">
        <!-- image -->
        <div class="q-ml-md bubble-list-item-image">
          <q-avatar size="50px">
            <img :src="thing.dataObject.mainImageUrl" class="contain" />
          </q-avatar>
        </div>
        <!-- text -->
        <div class="bubble-list-item-text">
          <p class="q-mb-none text-body1">{{ thing.dataObject.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['things']
}
</script>
<style lang="stylus" scoped>
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
.transition {
  animation-name: slideLeft;
  animation-duration: 0.4s;
  transition: 1s animation-name ease-in-out;
}
@keyframes slideLeft {
  0% {
    transform: translateX(150%);
  }

  100% {
    transform: translateX(0%);
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
  padding: 0 10px 10px;
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
  .show-mobile-items {
    display: block !important;

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

</style>
