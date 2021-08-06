<template>
  <div class="row">
    <div class="col">
      <div
        v-for="item in items"
        v-bind:key="item.TITLE"
        class="row"
      >
        <q-card
          style="width: 95%;"
          class="feed-card bg-white q-ma-md"
        >
          <q-card-section
            horizontal

            class="q-ma-sm"
          >
            <div class="q-mx-xs">
              <q-img
                contain
                class="q-ma-md"
                width="10rem"
                :src="item.IA_IMAGES.IMAGE.URL"
              />
              <div class="text-caption text-center ">
                <source-code :code="item.SITEHOST" :bandi="true"/>
              </div>
            </div>

            <div class="text-h6 q-px-sm q-mt-md text-grey-8">
              <q-card flat style="widht: 100%" class="q-mx-sm">
                <div class="row">
                <div class="col-10 q-mx-sm text-body2">
                  <div class="q-pa-xs">
                  <source-code :code="item.DESCRIPTION" :bandi="true"/>
                </div>
                </div>

              </div>
              </q-card>

              <div class="row">
                <div class="col q-ma-md">
                  <a
                    type="a"
                    :href="item.LINK"
                    target="_blank"
                    color="grey-10"
                    style="width: 90%"
                    @click="linkClick"
                    class="shadow-14 q-ml-md q-pt-md"
                  >
                    <source-code :code="item.TITLE" :bandi="true" />
                  </a>
                </div>
              </div>

            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['thing'],
  data () {
    return {
      debug: this.$debug.extend('thing-template:product'),
      loading: false,
      items: [
        {
          'RANK': '1',
          'VCWTAG': 'key=tag-1427826-0-202004232004324322784926101011&affID=1427826&sid=1011',
          'TITLE': '<b>Health</b> <b>Food</b> - Today Here',
          'DESCRIPTION': 'Find <b>Health</b> <b>Food</b>. Explore Other Results at ConsumerSearch.com',
          'SITEHOST': 'www.consumersearch.com',
          'LINK': 'https%3A%2F%2Ffeeda1.validclick.com%2Fresult.php%3Fkey%3Dtag-1427826-0-202004232004324322784926101011%26affID%3D1427826%26sid%3D1011%26id%3DLFPvAffVC0%26sitehost%3Dwww.consumersearch.com',
          'IA_IMAGES': {
            'IMAGE': {
              'URL': 'https://in.imageadvantage.net/2/0C/CB/46E4ECB6578B943A238F94C58E6.jpg?pid=5400&qs=yvFllbqzk4jvpi%2CdmzDx%7C%7D1lsutzsh%7Bwlbwik7gvn%2BzwuA-myAe%2Fk%7B%3CMkduxo%27qz%3E8f-hyA%23%2Fp%7B%3Cg%2Cj%7D%3FMptj%29uxB0g%2Cj%7D%3F%27.%25Zrme%C2%80%21Mkun%2AkfxCIrrk%21%2BrwDf-hyAKnesum%2Co%7D%3F6c%2BmwD%24-myAe%2Fk%7B%3CKurm%2Asu%405e%2Fk%7B%3C3%26H%C2%81tspwk%23Xxofw%26Unw%7Cmyy%23jx%27Dttv%7EqlsXkd%7Bgo%2Fhup&d=www.consumersearch.com'
            }
          },
          'ID1': 'LFPvAffVC0'
        },
        {
          'RANK': '2',
          'VCWTAG': 'key=tag-1427826-1-202004232004323560886560391011&affID=1427826&sid=1011',
          'TITLE': '<b>Health</b> <b>Food</b> - Right Now',
          'DESCRIPTION': 'Welcome to Kensaq.com. Find <b>Health</b> <b>Food</b> Today!',
          'SITEHOST': 'www.kensaq.com',
          'LINK': 'https%3A%2F%2Ffeeda1.validclick.com%2Fresult.php%3Fkey%3Dtag-1427826-1-202004232004323560886560391011%26affID%3D1427826%26sid%3D1011%26id%3DLFPvAffVC1%26sitehost%3Dwww.kensaq.com',
          'IA_IMAGES': {
            'IMAGE': {
              'URL': 'https://in.imageadvantage.net/D/35/D7/E6A0302BC39255BDD85A40EE9D4.jpg?pid=5400&qs=yvFllbqzk4jvpi%2CdmzDx%7C%7D1tiutfw1lst%27yzoF%2Asu%40h%29pxBIjgo%7Dl-myA2k%2Anu%40%26%29uxBc%2BmwDJvpi%2Co%7D%3F6c%2BmwD%244%21Wojqx%27Ot%7D%29miz%3E%5Ckolstf%25zr%29Oloxgt7gvn3%26Irrk%21%2BrwDf-hyAKnesum%2Co%7D%3F6c%2BmwD%24-myAe%2Fk%7B%3CKurm%2Asu%405e%2Fk%7B%3C%25Zrme%C2%80%22&d=www.kensaq.com'
            }
          },
          'ID1': 'LFPvAffVC1'
        },
        {
          'RANK': '3',
          'VCWTAG': 'key=tag-1427826-2-202004232004321513716918091011&affID=1427826&sid=1011',
          'TITLE': '<b>Health</b> <b>food</b> website - Look what we have got',
          'DESCRIPTION': 'Check <b>Health</b> <b>food</b> website on Etour.com. Find <b>Health</b> <b>food</b> website here',
          'SITEHOST': 'www.etour.com',
          'LINK': 'https%3A%2F%2Ffeeda1.validclick.com%2Fresult.php%3Fkey%3Dtag-1427826-2-202004232004321513716918091011%26affID%3D1427826%26sid%3D1011%26id%3DLFPvAffVC2%26sitehost%3Dwww.etour.com',
          'IA_IMAGES': {
            'IMAGE': {
              'URL': 'https://in.imageadvantage.net/B/BE/21/654F31ADB646F6E6795011BF11E.jpg?pid=5400&qs=yvFllbqzk4jvpi%2CdmzDx%7C%7D1nxvvw4fxq-uyr%40%2Fp%7B%3Cg%2Cj%7D%3FOffrwq%2Asu%405e%2Fk%7B%3C%25%2Co%7D%3Fi%27lz%3Eosve%2BrwD3i%27lz%3E%29%7Blcxown%244%21Qurt%24%7Eifz%23%C2%80i%27if%7Ch%29kvu%2Bjh%7CAJijin%29%2Asu%40h%29pxBIjgo%7Dl-myA2k%2Anu%40%26%29uxBc%2BmwDjvpi%2Co%7D%3F6c%2BmwD%24%7Efgyl%7Di%27ps%26H%7Ds%7Cs3irv2%27Gntg%29%2Asu%40h%29pxBIjgo%7Dl-myA2k%2Anu%40%26%29uxBc%2BmwDjvpi%2Co%7D%3F6c%2BmwD%24%7Efgyl%7Di%27ijxh&d=www.etour.com'
            }
          },
          'ID1': 'LFPvAffVC2'
        }
      ]
    }
  },
  mounted () {
    this.loaded = true
    this.$emit('loaded')
  },
  methods: {
    closeButton () {
      this.$emit('cancel')

      // play event
      this.$emit('CloseBtnStopVideo')
    },
    linkClick (e, go) {
      e.navigate = false // we choose when we navigate
      this.$analytics(this.$common.constants.events.action, this.thing.id)
      this.$pulse('activationAction', { id: this.thing.id })
      // console.log('triggering navigation in 2s')
      setTimeout(() => {
        // console.log('navigating as promised 2s ago')
        go()
      }, 2000)
    }
  }
}
</script>
