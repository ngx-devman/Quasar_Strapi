<template>
  <div class="full-height">
    <div class="carousel">
        <img
            class="image cursor-pointer"
            src="https://i2.rozetka.ua/goods/11422569/77727942_images_11422569714.jpg"
        />
    </div>

    <div class="q-my-lg text-center q-mx-md">
        <div class="text-h6 text-uppercase text-white">Alabama Shakes</div>
            <div
            class="thin-paragraph q-mt-sm q-mb-md text-white">Future People</div>
    </div>

    <div class="q-px-lg">
        <div>
            <q-btn unelevated rounded label="Play" class="q-mb-md full-width" style="background-color: #1FD660; color: white" size="lg"></q-btn>
        </div>

        <div>
            <q-btn unelevated rounded label="Follow" class="q-mb-md full-width" style="border: 3px solid white; color: white" size="lg"></q-btn>
        </div>

        <div>
            <q-btn unelevated rounded label="Purchase" class="full-width gradient" style="color: white" size="lg"></q-btn>
        </div>
    </div>

</div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  mouted () {
    this.$emit('loaded')
  }
}
</script>
<style lang="stylus" scoped>
.gradient {
    background: rgb(161,36,172);
    background: linear-gradient(140deg, rgba(161,36,172,1) 0%, rgba(255,108,61,1) 50%, rgba(217,24,97,1) 100%);
}

.carousel {
  height: 18em;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s;
}
.carousel img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s;
}
.info-card {
  padding: 0.7em;
  color: black;
}
.center .vgs {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
