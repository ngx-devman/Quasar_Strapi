export default {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  map: {
    'toV1': {
      'startTimeMs': {
        key: 'meta.start',
        transform: seconds => seconds / 1000
      },
      'endTimeMs': {
        key: 'meta.end',
        transform: seconds => seconds / 1000
      },
      'dataObject.mainImageUrl': {
        key: 'data.icon',
        transform: imageUrl => imageUrl || 'https://cdn.sourcesync.io/media/default-icon.png'
      },
      'version': 'mapped',
      'type': 'dataObject.dataTypeName',
      'meta.productId': 'dataObject.data.externalProductId',
      'meta.storefront': 'dataObject.data.externalCatalogId',
      'meta.media': 'dataObject.media',
      'data.media': 'dataObject.media',
      'data.name': 'dataObject.data.name',
      'data.discription': 'dataObject.data.discription',
      'data.label': 'dataObject.data.buttonText',
      'data.link': 'dataObject.data.buttonRedirectUrl',
      'data.price': [
        { key: 'dataObject.data.price' },
        { key: 'dataObject.data.basePrice' }
      ]
    }
  },
  'adapter': {
    'version': 1,
    'map': {
      'startTimeMs': 'start',
      'endTimeMs': 'end',
      'dataObject.dataTypeName': 'type',
      'dataObject.media': 'data.media',
      'dataObject.data.name': 'data.name'
    }
  },
  'type': 'object',
  'required': ['dataObject', 'startTimeMs', 'endTimeMs'],
  'properties': {
    'startTimeMs': {
      'type': 'integer',
      'minimum': 0
    },
    'endTimeMs': {
      'type': 'integer',
      'minimum': 0
    },
    'dataObject': {
      'type': 'object',
      'required': ['name', 'dataTypeName', 'media', 'data'],
      'properties': {
        'name': {
          'type': 'string'
        },
        'dataTypeName': {
          'type': 'string'
        },
        'media': {
          'type': 'array'
        },
        'data': {
          'type': 'object'
        }
      }
    },
    'data': {
      'type': 'object',
      'properties': {
        'price': {
          'type': 'number'
        },
        'description': {
          'type': 'string'
        },
        'name': {
          'type': 'string'
        }
      }
    }
  }
}
