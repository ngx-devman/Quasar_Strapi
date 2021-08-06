<template>
  <div class="full-height full-width" style=" overflow-y: auto;">
    <q-form ref="myForm">
      <p class="text-h6 q-mb-xs">Contact information</p>
      <q-input
        outlined
        v-model="email"
        type="email"
        label="Email"
        :rules="[val => (val && required) || 'Please type your Email']"
        :readonly="emailAvailable === 1"
        lazy-rules
      ></q-input>
      <p class="text-h6 q-mt-md q-mb-xs">Shipping address</p>
      <q-input
        outlined
        v-model="firstName"
        label="First name"
        class="q-mb-md"
        :rules="[
          val => (val && val.length > 0) || 'Please type your First name'
        ]"
      ></q-input>
      <q-input
        outlined
        v-model="lastName"
        label="Last name"
        class="q-mb-md"
        :rules="[
          val => (val && val.length > 0) || 'Please type your Last name'
        ]"
      ></q-input>
      <q-input
        outlined
        v-model="address"
        label="Address"
        class="q-mb-md"
        :rules="[val => (val && val.length > 0) || 'Please type your Address']"
      ></q-input>
      <q-input
        outlined
        v-model="buildType"
        label="Apartment, suite, etc. (optional)"
        class="q-mb-md"
      ></q-input>
      <q-input
        outlined
        v-model="city"
        label="City"
        class="q-mb-md"
        :rules="[val => (val && val.length > 0) || 'Please type your City']"
      ></q-input>
      <q-select outlined v-model="state" :options="states" label="Province" class="q-mb-md" />
      <q-input
        outlined
        v-model="zip"
        label="Zip"
        class="q-mb-md"
        :rules="[val => (val && val.length > 0) || 'Please type your Zip']"
      ></q-input>
      <q-input outlined v-model="phone" type="tel" label="Phone (optional)" class="q-mb-md"></q-input>
      <q-btn
        type="submit"
        @click="validateForm"
        size="lg"
        no-caps
        color="primary"
        label="Continue to shipping"
        class="full-width"
      ></q-btn>
    </q-form>
  </div>
</template>
<script>
export default {
  props: [
    'bubbleItem',
    'items',
    'cart',
    'productionId',
    'customerId',
    'currentTimeMs'
  ],
  components: {
    // Cart
  },
  data () {
    return {
      email: null,
      emailAvailable: 0,
      firstName: null,
      lastName: null,
      address: null,
      buildType: null,
      city: null,
      state: null,
      zip: null,
      phone: null,
      province: '',
      states: [
        {
          label: 'Alabama',
          value: 'AL'
        },
        {
          label: 'Alaska',
          value: 'AK'
        },
        {
          label: 'American Samoa',
          value: 'AS'
        },
        {
          label: 'Arizona',
          value: 'AZ'
        },
        {
          label: 'Arkansas',
          value: 'AR'
        },
        {
          label: 'California',
          value: 'CA'
        },
        {
          label: 'Colorado',
          value: 'CO'
        },
        {
          label: 'Connecticut',
          value: 'CT'
        },
        {
          label: 'Delaware',
          value: 'DE'
        },
        {
          label: 'District Of Columbia',
          value: 'DC'
        },
        {
          label: 'Federated States Of Micronesia',
          value: 'FM'
        },
        {
          label: 'Florida',
          value: 'FL'
        },
        {
          label: 'Georgia',
          value: 'GA'
        },
        {
          label: 'Guam',
          value: 'GU'
        },
        {
          label: 'Hawaii',
          value: 'HI'
        },
        {
          label: 'Idaho',
          value: 'ID'
        },
        {
          label: 'Illinois',
          value: 'IL'
        },
        {
          label: 'Indiana',
          value: 'IN'
        },
        {
          label: 'Iowa',
          value: 'IA'
        },
        {
          label: 'Kansas',
          value: 'KS'
        },
        {
          label: 'Kentucky',
          value: 'KY'
        },
        {
          label: 'Louisiana',
          value: 'LA'
        },
        {
          label: 'Maine',
          value: 'ME'
        },
        {
          label: 'Marshall Islands',
          value: 'MH'
        },
        {
          label: 'Maryland',
          value: 'MD'
        },
        {
          label: 'Massachusetts',
          value: 'MA'
        },
        {
          label: 'Michigan',
          value: 'MI'
        },
        {
          label: 'Minnesota',
          value: 'MN'
        },
        {
          label: 'Mississippi',
          value: 'MS'
        },
        {
          label: 'Missouri',
          value: 'MO'
        },
        {
          label: 'Montana',
          value: 'MT'
        },
        {
          label: 'Nebraska',
          value: 'NE'
        },
        {
          label: 'Nevada',
          value: 'NV'
        },
        {
          label: 'New Hampshire',
          value: 'NH'
        },
        {
          label: 'New Jersey',
          value: 'NJ'
        },
        {
          label: 'New Mexico',
          value: 'NM'
        },
        {
          label: 'New York',
          value: 'NY'
        },
        {
          label: 'North Carolina',
          value: 'NC'
        },
        {
          label: 'North Dakota',
          value: 'ND'
        },
        {
          label: 'Northern Mariana Islands',
          value: 'MP'
        },
        {
          label: 'Ohio',
          value: 'OH'
        },
        {
          label: 'Oklahoma',
          value: 'OK'
        },
        {
          label: 'Oregon',
          value: 'OR'
        },
        {
          label: 'Palau',
          value: 'PW'
        },
        {
          label: 'Pennsylvania',
          value: 'PA'
        },
        {
          label: 'Puerto Rico',
          value: 'PR'
        },
        {
          label: 'Rhode Island',
          value: 'RI'
        },
        {
          label: 'South Carolina',
          value: 'SC'
        },
        {
          label: 'South Dakota',
          value: 'SD'
        },
        {
          label: 'Tennessee',
          value: 'TN'
        },
        {
          label: 'Texas',
          value: 'TX'
        },
        {
          label: 'Utah',
          value: 'UT'
        },
        {
          label: 'Vermont',
          value: 'VT'
        },
        {
          label: 'Virgin Islands',
          value: 'VI'
        },
        {
          label: 'Virginia',
          value: 'VA'
        },
        {
          label: 'Washington',
          value: 'WA'
        },
        {
          label: 'West Virginia',
          value: 'WV'
        },
        {
          label: 'Wisconsin',
          value: 'WI'
        },
        {
          label: 'Wyoming',
          value: 'WY'
        }
      ],
      /*eslint-disable */
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  methods: {
    onSubmit() {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      });
    },
    validateForm() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          /* Get shipping methods from service */
          this.$emit("nextTab");
          this.$emit("email", {
            email: this.email,
            address: this.address,
            firstName: this.firstName,
            lastName: this.lastName,
            address1: this.address,
            address2: this.buildType,
            buildType: this.buildType,
            city: this.city,
            province: this.state !== null ? this.state.value : "",
            zip: this.zip,
            phone: this.phone
          });
        }
      });
    }
  },
  mounted () {
    var email = localStorage.getItem('email')
    var mobile = localStorage.getItem('mobile')
    var token = localStorage.getItem('token')
    if(email !== '' || mobile !== '' || token !== ''){
      this.email = email
      // Get shipping data from user service
      var self = this
      this.$common.timeline.callUserInfo().then(function (response) {
        var resp = response.data
        self.email = resp.email
        if (resp.hasOwnProperty('userShipping')) {
          self.firstName = resp.userShipping.firstName
          self.lastName = resp.userShipping.lastName
          self.address = resp.userShipping.address1
          self.buildType = resp.userShipping.address2
          self.city = resp.userShipping.city
          self.state = resp.userShipping.province
          self.zip = resp.userShipping.zip
        }
        if(resp.email !== '' && resp.email !== null){
          self.emailAvailable = 1
        }else{
          self.emailAvailable = 0
        }
        self.phone = resp.mobile
      })
    }
  },
  computed: {
    required() {
      if (this.reg.test(this.email)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="stylus" scoped></style>
