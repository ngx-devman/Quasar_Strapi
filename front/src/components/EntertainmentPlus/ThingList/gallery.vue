<template>
  <div class="list-item cursor-pointer" :class='active === index ? "active": "deactive"' @click="$emit('detail', index)">
    <q-img class='col' :ratio='16/9' :class='active === index ? "card-border" : ""' :src="thing.poster"/>
    <p class='q-ma-none list-item__info text-size ellipsis' :class='[active === index ? "text-yellow-7" : "text-white", $q.screen.lt.md ? "text-sm" : "text-lg"]'> {{thing.name}}</p>
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
.card-border
  border 3px solid #ddd
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
