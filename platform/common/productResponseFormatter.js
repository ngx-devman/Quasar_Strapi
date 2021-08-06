module.exports = (response, platform) => {
    if(platform == "magento") {
        const images = response.media_gallery_entries.map(img => {
            return {
                id: img.id,
                alt: img.label,
                src: img.file   
            }
        })

        const options = response.options.map(o => {
            const values = o.values.map(v => {
                return {
                    id: v.sku,
                    title: v.title,
                    price: v.price,
                    stock_quantity: null
                }
            })
            return {
                id: o.option_id,
                title: o.title,
                values
            }
        })
        return {
            product: {
                id: response.sku,
                title: response.name,
                description: response.name,
                type: response.type_id,
                images,
                options,
                stock_quantity: response.extension_attributes.stock_item ? response.extension_attributes.stock_item.qty : null,
                createdAt: response.created_at,
                updatedAt: response.updated_at
            }
        }
    } else if(platform == "wooCommerce") {
        const images = response.images.map(img => {
            return {
                id: img.id,
                alt: img.alt,
                src: img.src
            }
        })

        const options = response.attributes.map(o => {
            let values = []
            response.variations.forEach(v => {
               v.attributes.map(a => {
                   if(a.id == o.id) {
                        values.push({
                            id: v.id,
                            title: a.option,
                            price: v.price,
                            stock_quantity: v.stock_quantity
                        })
                   }
               })
            })
            return {
                id: o.id,
                title: o.name,
                values
            }
        })
        return {
            product: {
                id: response.id,
                title: response.name,
                description: response.description,
                type: response.type,
                images,
                options,
                stock_quantity: response.stock_quantity,
                createdAt: response.date_created,
                updatedAt: response.date_modified
            }
        }
    }else {
        response = response.product

        const images = response.images.map(img => {
            return {
                id: img.id,
                src: img.src,
                alt: img.alt
            }
        })

        const options = response.options.map(o => {
            let values = []
            response.variants.forEach(v => {
                if(o.values.includes(v.title)) {
                    values.push({
                        id: v.id,
                        title: v.title,
                        price: v.price,
                        stock_quantity: v.inventory_quantity
                    })
                }
            })
            return {
                id: o.id,
                title: o.name,
                values
            }
        })

        return {
            product: {
                id: response.id,
                title: response.title,
                description: response.body_html,
                type: response.product_type,
                images,
                options,
                stock_quantity: null,
                createdAt: response.created_at,
                updatedAt: response.updated_at
            }
        }
    }
}