module.exports = (response, platform) => {
    if(platform == "magento") {
        const products = response.items.map((item) => {
            return {
                id: item.sku,
                title: item.name,
                body_html: item.name,
                vendor: null,
                product_type: item.type_id,
                created_at: item.created_at,
                handle: null,
                updated_at: item.updated_at,
                published_at: item.published_at,
                template_suffix: null,
                published_scope: null,
                tags: null,
                admin_graphql_api_id: null,
                variants: [],
                options: item.options,
                images: item.media_gallery_entries
            }
        })
        return {
            products 
        }
    } else if(platform == "wooCommerce") {
        const products = response.map((item) => {
            return {
                id: item.id,
                title: item.name,
                body_html: item.name,
                vendor: null,
                product_type: item.type,
                created_at: item.date_created,
                handle: item.slug,
                updated_at: item.date_modified,
                published_at: null,
                template_suffix: null,
                published_scope: null,
                tags: item.tags,
                admin_graphql_api_id: item.permalink,
                variants: [],
                options: item.options,
                images: item.images
            }
        })
        return {
            products 
        }
    }else {
        return response
    }
}