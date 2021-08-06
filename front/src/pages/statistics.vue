<template>
  <q-page class='flex column' v-if='products.length > 0' style='padding: 20px'>
    <h4>Products JSON...</h4>
    <vue-json-pretty :data='products' :deep='0' />
    <h4>Users JSON...</h4>
    <vue-json-pretty :data='users' :deep='0' />
    <h4>Orders JSON...</h4>
    <vue-json-pretty :data='orders' />
    <h4>Config JSON...</h4>
    <vue-json-pretty :data='$config' :deep='0' />
    <h4>Products rendered...</h4>
    <Basic />
    <section class='flex flex-center'>
      <entity
        v-for='product in products'
        template='product'
        :object='product'
        :key='product.id'
      />
    </section>
  </q-page>
</template>

<script>
import vueJsonPretty from 'vue-json-pretty'
import Basic from '../components/Basic'
export default {
  name: 'PageIndex',
  components: { vueJsonPretty, Basic },
  data () {
    return {
      products: [],
      users: [],
      orders: {},
      config: {}
    }
  },
  mounted () {
    /*
    this.$api.service('shipping').get(this.$config.config).then((r) => {
      console.log('Shipping...', this.$config.config, r)
    })
    // Get all users...
    this.$api.service('users').find().then((r) => {
      console.log('Users...', r)
      this.users = r
    })

    // Get all products...
    this.$api.service('products').get(this.$config.config).then((r) => {
      console.log('Products...', r)
      this.products = r.products
    })

    const shippingAddress = {
      'address1': '123 Amoebobacterieae St',
      'address2': '',
      'city': 'Ottawa',
      'company': null,
      'country': 'Canada',
      'first_name': 'Bob',
      'last_name': 'Bobsen',
      'latitude': '45.41634',
      'longitude': '-75.6868',
      'phone': '555-625-1199',
      'province': 'Ontario',
      'zip': 'K2P0V6',
      'name': 'Bob Bobsen',
      'country_code': 'CA',
      'province_code': 'ON'
    }

    const shippingLine = {
      'handle': 'usps'
    }

    // Get an order...
    const order = {
      'draft_order': {
        'id': 490721837138,
        'note': null,
        'email': null,
        'taxes_included': true,
        'currency': 'USD',
        'invoice_sent_at': null,
        'created_at': '2019-10-09T17:27:54-07:00',
        'updated_at': '2019-10-09T17:27:54-07:00',
        'tax_exempt': false,
        'completed_at': null,
        'name': '#D121',
        'status': 'open',
        'line_items': [
          {
            'variant_id': 30005218967634,
            'product_id': 4079657779282,
            'title': 'Product 2',
            'variant_title': null,
            'sku': '12345-s',
            'vendor': 'Kevin',
            'quantity': 1,
            'requires_shipping': true,
            'taxable': true,
            'gift_card': false,
            'fulfillment_service': 'manual',
            'grams': 454,
            'tax_lines': [
              {
                'rate': 0.0725,
                'title': 'CA State Tax',
                'price': '3.99'
              },
              {
                'rate': 0.0225,
                'title': 'Los Angeles County Tax',
                'price': '1.24'
              }
            ],
            'applied_discount': null,
            'name': 'Product 2',
            'properties': [],
            'custom': false,
            'price': '55.00',
            'admin_graphql_api_id': 'gid://shopify/DraftOrderLineItem/54282494083154'
          }
        ],
        'shipping_address': shippingAddress,
        'billing_address': null,
        'invoice_url': 'https://verteluxe.myshopify.com/25864765522/invoices/1e0dc473088364a27a1230b0ac728fdb',
        'applied_discount': null,
        'order_id': null,
        'shipping_line': shippingLine,
        'tax_lines': [
          {
            'rate': 0.0725,
            'title': 'CA State Tax',
            'price': '3.99'
          },
          {
            'rate': 0.0225,
            'title': 'Los Angeles County Tax',
            'price': '1.24'
          }
        ],
        'tags': '',
        'note_attributes': [],
        'total_price': '60.23',
        'subtotal_price': '55.00',
        'total_tax': '5.23',
        'admin_graphql_api_id': 'gid://shopify/DraftOrder/490721837138',
        'customer': null
      }
    }
    this.$api.service('orders').update('490721837138', order, { query: { client: this.$config.config } }).then((r) => {
      console.log('Getting order again...', r)
      this.$api.service('orders').get(this.$config.config, { query: { id: r.draft_order.id } }).then((r) => {
        console.log('Order details', r)
        this.orders = r
      })
    })
    /*
    this.$api.service('orders').create(order, { query: { client: this.$config.config } })
      .then((r) => {
        console.log('Created order...', r.draft_order.id)
        console.log('Getting order again...')
        this.$api.service('orders').get(this.$config.config, { query: { id: r.draft_order.id } }).then((r) => {
          console.log('Order details', r)
          this.orders = r
        })
      })
    */
  }
}
</script>
