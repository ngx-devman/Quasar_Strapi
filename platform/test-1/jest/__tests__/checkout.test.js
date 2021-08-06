const axios = require("axios")

describe("Checkout Service", () => {
    test("Test Checkout", async () => {
        const response = await axios.post("http://localhost:1337/checkout", {
            amount: 20
        })
        
        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
    })

    test("Test Checkout Cart", async () => {
        const response = await axios.post("http://localhost:1337/checkout/cart", {
            "cart":[
                {
                "product":{
                    "id":"5d005ce6123dc305b4173309",
                    "dataTypeId":"5c9ce8e441ed370360546243",
                    "dataType":"multipleObjects",
                    "dataTypeName":"product",
                    "dataTypeDisplayName":"Products",
                    "name":"\"Coffee, or Die\" Desk Press - Gold",
                    "description":"",
                    "timelineText":"\"Coffee, or Die\" Desk Press - Gold ",
                    "mainImageUrl":"https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/e924c5c3-2c86-41cc-ad6b-46abce8f0b54.jpg",
                    "media":[
                        {
                            "id":"5d005dbe123dc305b417392b",
                            "url":"https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/e924c5c3-2c86-41cc-ad6b-46abce8f0b54.jpg",
                            "name":"180803_PRODUCTS_PRESS_01_large-1.jpg",
                            "fileName":"180803_PRODUCTS_PRESS_01_large-1.jpg",
                            "contentType":"image/jpeg",
                            "isMainImage":true,
                            "sizeInBytes":38528,
                            "type":"image",
                            "alternateSizes":[
        
                            ]
                        }
                    ],
                    "data":{
                        "name":"\"Coffee, or Die\" Desk Press - Gold",
                        "description":"The \"Coffee, or Die\" Desk Press will solve a couple of problems for you. One, you'll look like a f*cking badass. Two, you'll be able to pour hot water straight onto your favorite Black Rifle Coffee grounds, let it steep, and then push the strainer through to freedom. This is the perfect mug or individual",
                        "brandName":"",
                        "shoppingLink":"https://www.blackriflecoffee.com/collections/equipment/products/american-press",
                        "price":"1.99",
                        "basePrice":1.99,
                        "lowestPrice":1.99,
                        "buttonRedirectUrl":"https://www.blackriflecoffee.com/collections/equipment/products/american-press",
                        "buttonText":"Buy Direct at Black Rifle Online",
                        "externalProductId":"4345645858898",
                        "externalCatalog":"verteluxe",
                        "itemCode":"",
                        "reactorOneProductSlug":"4345645858898",
                        "extendedProductId":"4345645858898",
                        "supportsNativeCommerce":true
                    },
                    "cpm":null,
                    "cpc":null,
                    "defaultBrandId":null,
                    "modalExtensionIconType":null,
                    "productSuggestions":{
                        "specificProducts":[
        
                        ],
                        "enabledMarketplaceIds":[
        
                        ],
                        "keywords":null
                    }
                },
                "variant":{
                    "id":"4345645858898",
                    "salePrice":1.99,
                    "externalMediaIds":[
        
                    ],
                    "details":{
        
                    }
                },
                "quantity":1,
                "amount":1.99
                }
            ]
        })

        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
    })


    test("Test Checkout Shipping", async () => {
        const response = await axios.post("http://localhost:1337/checkout/shipping", {
            "cart":[
                {
                "product":{
                    "id":"5d005ce6123dc305b4173309",
                    "dataTypeId":"5c9ce8e441ed370360546243",
                    "dataType":"multipleObjects",
                    "dataTypeName":"product",
                    "dataTypeDisplayName":"Products",
                    "name":"\"Coffee, or Die\" Desk Press - Gold",
                    "description":"",
                    "timelineText":"\"Coffee, or Die\" Desk Press - Gold ",
                    "mainImageUrl":"https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/e924c5c3-2c86-41cc-ad6b-46abce8f0b54.jpg",
                    "media":[
                        {
                            "id":"5d005dbe123dc305b417392b",
                            "url":"https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/e924c5c3-2c86-41cc-ad6b-46abce8f0b54.jpg",
                            "name":"180803_PRODUCTS_PRESS_01_large-1.jpg",
                            "fileName":"180803_PRODUCTS_PRESS_01_large-1.jpg",
                            "contentType":"image/jpeg",
                            "isMainImage":true,
                            "sizeInBytes":38528,
                            "type":"image",
                            "alternateSizes":[
        
                            ]
                        }
                    ],
                    "data":{
                        "name":"\"Coffee, or Die\" Desk Press - Gold",
                        "description":"The \"Coffee, or Die\" Desk Press will solve a couple of problems for you. One, you'll look like a f*cking badass. Two, you'll be able to pour hot water straight onto your favorite Black Rifle Coffee grounds, let it steep, and then push the strainer through to freedom. This is the perfect mug or individual",
                        "brandName":"",
                        "shoppingLink":"https://www.blackriflecoffee.com/collections/equipment/products/american-press",
                        "price":"1.99",
                        "basePrice":1.99,
                        "lowestPrice":1.99,
                        "buttonRedirectUrl":"https://www.blackriflecoffee.com/collections/equipment/products/american-press",
                        "buttonText":"Buy Direct at Black Rifle Online",
                        "externalProductId":"4345645858898",
                        "externalCatalog":"verteluxe",
                        "itemCode":"",
                        "reactorOneProductSlug":"4345645858898",
                        "extendedProductId":"4345645858898",
                        "supportsNativeCommerce":true
                    },
                    "cpm":null,
                    "cpc":null,
                    "defaultBrandId":null,
                    "modalExtensionIconType":null,
                    "productSuggestions":{
                        "specificProducts":[
        
                        ],
                        "enabledMarketplaceIds":[
        
                        ],
                        "keywords":null
                    }
                },
                "variant":{
                    "id":"4345645858898",
                    "salePrice":1.99,
                    "externalMediaIds":[
        
                    ],
                    "details":{
        
                    }
                },
                "quantity":1,
                "amount":1.99
                }
            ]
        })

        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
    })
})