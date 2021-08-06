<template>
  <div class="list-item cursor-pointer" :class='active === index ? "active": "deactive"' @click="$emit('detail', index)">
    <q-img :ratio="16/9" :class='active === index ? "card-border" : ""' :src="thing.poster">
      <div v-if='active !== index' class="play absolute-full flex flex-center"><q-icon name="play_circle_outline" /></div>
    </q-img>
    <div class='list-item__info column no-wrap'>
      <p class='ellipsis q-ma-none' :class='[active === index ? "text-yellow-7" : "text-white", $q.screen.lt.md ? "text-sm" : "text-lg"]'>{{thing.name}}</p>
      <div :class='$q.screen.sm && $app.layout.orientation === "landscape" ? "col-8" : "col-9"'>
        <q-scroll-area class='fit'>
          <p v-if='thing.description' class='sub-text' :class='$q.screen.lt.md ? "text-sm" : "text-lg"'>{{thing.description}}</p>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['thing', 'index', 'active']
}
</script>
<style lang='stylus' scoped>
/deep/.q-img__image
  background-size 100% 100%!important
.q-img__content > .time
  padding 5px 10px 5px 10px
  background-color rgba(0, 0, 0, 1)
.q-img__content > .play
  background-color rgba(0, 0, 0, 0)
.card-border
  border 3px solid #ddd
.play
  font-size 4em
.sub-text
  font-size 1em
.active
  opacity 1
  transition: opacity .25s ease-in-out
  -moz-transition: opacity .25s ease-in-out
  -webkit-transition: opacity .25s ease-in-out
.deactive
  opacity 0.5
  transition: opacity .25s ease-in-out
  -moz-transition: opacity .25s ease-in-out
  -webkit-transition: opacity .25s ease-in-out
.list-item
  display grid
  grid-template-columns 45% 55%
  width 100%
  margin-bottom 1em
.list-item__info
  padding-top .1em
  padding-left .5em
.text-lg
  font-size 1.5em
.text-sm
  font-size 1.3em
</style>
