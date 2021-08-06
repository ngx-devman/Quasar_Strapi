<template>
  <div class="refine-listing">
    <q-btn-dropdown outline no-caps align="between" color="black" label="Year" class="full-width">
      <q-list class="q-mx-auto" style="max-width: 450px">
        <q-item >
          <q-item-section class="row justify-center">
            <q-option-group
              name="group_year"
              v-model="group_year"
              :options="options_year"
              type="checkbox"
              color="primary"
              inline
            />
          </q-item-section>
        </q-item>

        <q-item class="justify-center">
          <q-btn no-caps color="red" label="Save" class="q-mr-md"></q-btn>
          <q-btn no-caps color="black" label="Cancel"></q-btn>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown
      outline
      no-caps
      align="between"
      color="black"
      label="Make"
      class="full-width q-my-md"
    >
      <q-list class="q-mx-auto" style="max-width: 450px">
        <q-item>
          <q-option-group
            name="group_make"
            v-model="group_make"
            :options="options_make"
            type="checkbox"
            color="primary"
            inline
          />
        </q-item>

        <q-item class="justify-center">
          <q-btn no-caps color="red" label="Save" class="q-mr-md"></q-btn>
          <q-btn no-caps color="black" label="Cancel"></q-btn>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown outline no-caps align="between" color="black" label="Model" class="full-width">
      <q-list class="q-mx-auto" style="max-width: 450px">
        <q-option-group
          name="group_model"
          v-model="group_model"
          :options="options_model"
          type="checkbox"
          color="primary"
          inline
        />
      </q-list>
    </q-btn-dropdown>

    <div class="row justify-between q-mt-md">
      <q-btn no-caps color="red" label="Search" />
      <!-- <q-btn no-caps color="yellow" label="Sort" icon-right="sort" /> -->
      <q-btn-dropdown color="yellow" label="Sort" dropdown-icon="sort" no-icon-animation>
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick" v-for="item in sort" :key="item">
            <q-item-section>
              <q-item-label>{{item}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      group_year: [],
      group_make: [],
      group_model: [],
      sort: [
        'Highest to Lowest Price',
        'Lowest to Highest Price',
        'Newest to Oldest Model',
        'Oldest to Newest Model'
      ],
      options_year: [
        {
          label: '1989',
          value: '1989'
        },
        {
          label: '1990',
          value: '1990'
        },
        {
          label: '1991',
          value: '1991'
        },
        {
          label: '1992',
          value: '1992'
        },
        {
          label: '1993',
          value: '1993'
        },
        {
          label: '1994',
          value: '1994'
        },
        {
          label: '1995',
          value: '1995'
        },
        {
          label: '1996',
          value: '1996'
        },
        {
          label: '1997',
          value: '1997'
        },
        {
          label: '1998',
          value: '1998'
        },
        {
          label: '1999',
          value: '1999'
        },
        {
          label: '2000',
          value: '2000'
        },
        {
          label: '2001',
          value: '2001'
        },
        {
          label: '2002',
          value: '2002'
        },
        {
          label: '2003',
          value: '2003'
        },
        {
          label: '2004',
          value: '2004'
        },
        {
          label: '2005',
          value: '2005'
        },
        {
          label: '2006',
          value: '2006'
        },
        {
          label: '2007',
          value: '2007'
        },
        {
          label: '2008',
          value: '2008'
        },
        {
          label: '2009',
          value: '2009'
        },
        {
          label: '2010',
          value: '2010'
        }
      ],
      options_make: [
        {
          label: 'Acura',
          value: 'acura'
        },
        {
          label: 'Alfa Romeo',
          value: 'alfa_romeo'
        },
        {
          label: 'Audi',
          value: 'audi'
        },
        {
          label: 'BMW',
          value: 'bmw'
        },
        {
          label: 'Bentley',
          value: 'bentley'
        },
        {
          label: 'Chevrolet',
          value: 'chevrolet'
        },
        {
          label: 'Fiat',
          value: 'fiat'
        },
        {
          label: 'Ford',
          value: 'ford'
        },
        {
          label: 'Honda',
          value: 'honda'
        },
        {
          label: 'Jeep',
          value: 'jeep'
        },
        {
          label: 'Kia',
          value: 'kia'
        },
        {
          label: 'Lexus',
          value: 'lexus'
        },
        {
          label: 'Nissan',
          value: 'nissan'
        },
        {
          label: 'Rolls-Roys',
          value: 'rolls-roys'
        },
        {
          label: 'Saab',
          value: 'saab'
        },
        {
          label: 'Smart',
          value: 'smart'
        }
      ],
      options_model: [
        {
          label: 'Ka',
          value: 'ka'
        },
        {
          label: 'Fiesta ST',
          value: 'fiesta_st'
        },
        {
          label: 'Eco Sport',
          value: 'eco_sport'
        },
        {
          label: 'Expedition',
          value: 'expedition'
        },
        {
          label: 'Transit Custom',
          value: 'transit_custom'
        },
        {
          label: 'Focus',
          value: 'focus'
        },
        {
          label: 'Mustang',
          value: 'mustang'
        },
        {
          label: '5-max',
          value: '5_max'
        },
        {
          label: 'Ranger',
          value: 'ranger'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.q-option-group--inline > div {
    width: 23%;
}

.q-option-group.q-gutter-x-sm {
    margin-left: 0;
}
</style>
