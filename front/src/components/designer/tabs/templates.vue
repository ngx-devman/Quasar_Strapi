<template>
  <div class="components-tab">
    <q-input
      v-model="searchTemplates"
      filled
      type="search"
      label="Search templates"
      label-color="grey-7"
      bg-color="white"
    >
      <template v-slot:append>
        <q-icon name="search"></q-icon>
      </template>
    </q-input>

    <div>
      <div class="row justify-between items-center">
        <div class="text-bold q-my-md">Featured</div>
        <q-btn flat no-caps size="sm" label="See all" />
      </div>

      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="primary"
        padding
        arrows
        height="120px"
        class="bg-blue-grey-9"
      >
        <q-carousel-slide
          :name="index + 1"
          class="column no-wrap"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <div class="row justify-start items-center full-height q-gutter-xs q-col-gutter no-wrap">
            <q-img
              class="rounded-borders"
              v-for="(image, index) in slide.images"
              :key="index"
              :src="image.slideImage"
            ></q-img>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div>
      <div class="row justify-between items-center">
        <div class="text-bold q-my-md">Grids</div>
        <q-btn flat no-caps size="sm" label="See all" />
      </div>

      <q-carousel
        v-model="slide2"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="primary"
        padding
        arrows
        height="120px"
        class="bg-blue-grey-9"
      >
        <q-carousel-slide
          :name="index + 1"
          class="column no-wrap"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <div class="row justify-start items-center full-height q-gutter-xs q-col-gutter no-wrap">
            <q-img
              class="rounded-borders"
              v-for="(image, index) in slide.images"
              :key="index"
              :src="image.slideImage"
            ></q-img>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div>
      <div class="row justify-between items-center">
        <div class="text-bold q-my-md">Shapes</div>
        <q-btn flat no-caps size="sm" label="See all" />
      </div>

      <q-carousel
        v-model="slide3"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="primary"
        padding
        arrows
        height="120px"
        class="bg-blue-grey-9"
      >
        <q-carousel-slide
          :name="index + 1"
          class="column no-wrap"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <div class="row justify-start items-center full-height q-gutter-xs q-col-gutter no-wrap">
            <q-img
              class="rounded-borders"
              v-for="(image, index) in slide.images"
              :key="index"
              :src="image.slideImage"
            ></q-img>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchTemplates: '',
      slide: 1,
      slide2: 1,
      slide3: 1,
      slides: [
        {
          images: [
            {
              slideImage:
                'https://media-public.canva.com/mRYs4/MADyt-mRYs4/1/tl.png'
            },
            {
              slideImage:
                'https://static.canva.com/charts/thumbnails/columnchart-1.svg'
            },
            { slideImage: 'https://cdn.quasar.dev/img/parallax2.jpg' }
          ]
        },
        {
          images: [
            { slideImage: 'https://cdn.quasar.dev/img/quasar.jpg' },
            { slideImage: 'https://cdn.quasar.dev/img/cat.jpg' },
            {
              slideImage:
                'https://media-public.canva.com/MADelaZrM3o/4/thumbnail_large.png'
            }
          ]
        },
        {
          images: [
            { slideImage: 'https://cdn.quasar.dev/img/material.png' },
            { slideImage: 'https://cdn.quasar.dev/img/donuts.png' },
            { slideImage: 'https://cdn.quasar.dev/img/mountains.jpg' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.components-tab {
  /deep/.q-carousel--arrows-horizontal.q-carousel--with-padding .q-carousel__slide {
    padding-left: 20px;
    padding-right: 20px;
  }

  /deep/ .q-carousel__prev-arrow--horizontal {
    left: 0;
  }

  /deep/ .q-carousel__next-arrow--horizontal, /deep/body.desktop .q-focus-helper {
    right: 0;
  }

  /deep/.q-carousel__slide {
    &::before {
      content: '';
      position: absolute;
      width: 24px;
      height: 100%;
      pointer-events: none;
      top: 0;
      left: 0;
      background: linear-gradient(270deg, rgba(41, 48, 57, 0), #293039);
    }

    &::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 100%;
      pointer-events: none;
      top: 0;
      right: 0;
      background: linear-gradient(90deg, rgba(41, 48, 57, 0), #293039);
    }
  }

  /deep/.q-carousel__control .q-btn {
    color: white !important;
  }
}
</style>
