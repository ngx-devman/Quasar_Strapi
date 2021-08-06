<template>
  <q-card>
    <q-card-section class="bg-deep-purple text-white">
      <div class="text-h6 q-mb-sm">Beautiful, Rare 1969 Ford Mustang</div>
    </q-card-section>

    <q-carousel animated v-model="slide" arrows infinite>
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg"></q-carousel-slide>
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg"></q-carousel-slide>
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg"></q-carousel-slide>
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg"></q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control position="top-left" :offset="[18, 18]">
          <q-btn no-caps color="red" label="Buy now"></q-btn>
        </q-carousel-control>
      </template>
    </q-carousel>

    <q-card-section>
      <q-tabs
        v-model="tab"
        dense
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        no-caps
        right-icon="arrow_right"
      >
        <q-tab name="specs" label="Specs"></q-tab>
        <q-tab name="description" label="Description"></q-tab>
        <q-tab name="test_drive" label="Test Drive"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="specs">
          <div class="row justify-between text-caption text-bold">
            <div>
              <div class="q-mb-md">
                <div>Mileage:</div>
                <div>66,223</div>
              </div>

              <div class="q-mb-md">
                <div>Drive type:</div>
                <div>4 wheel drive</div>
              </div>

              <div>
                <div>Exterior:</div>
                <div>Tuxedo Black</div>
              </div>
            </div>

            <div>
              <div class="q-mb-md">
                <div>Condition:</div>
                <div>Good</div>
              </div>

              <div class="q-mb-md">
                <div>Engine:</div>
                <div>8-Cylinder</div>
              </div>

              <div>
                <div>Interior:</div>
                <div>Medium Stone</div>
              </div>
            </div>

            <div>
              <div class="q-mb-md">
                <div>MPG:</div>
                <div>20 City /</div>
                <div>28 Highway</div>
              </div>

              <div class="q-mb-md">
                <div>Transmission:</div>
                <div>6-speed</div>
                <div>Automatic</div>
              </div>

              <div>
                <div>Fuel type:</div>
                <div>Gasoline</div>
              </div>
            </div>

            <div class="q-mt-md">
              <div>Vin:</div>
              <div>1fwqfiwfoi877382jnfoiqwfio</div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="description">
          <div
            class="text-weight-regular"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusamus culpa, dolor ducimus temporibus at perspiciatis doloribus officiis similique, vel laborum quasi, amet dicta nihil explicabo eveniet maiores molestiae nesciunt eaque laboriosam consequatur. Esse ut animi magni necessitatibus quasi earum veniam modi explicabo deserunt quis! Veniam tempora maiores dolores quam!</div>
        </q-tab-panel>

        <q-tab-panel name="test_drive">
          <div class="text-h6">Movies</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'local-listing',
  components: {},
  data () {
    return {
      slide: 1,
      tab: ''
    }
  }
}
</script>
