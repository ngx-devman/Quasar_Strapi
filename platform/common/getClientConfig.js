module.exports = async (storefrontId) => {
    try {
        const storefront = await strapi.query("apps").findOne({ id: storefrontId })
    
        if(!storefront) {
            return {
                success: false,
                message: "Storefront not found!"
            }
        }

        return {
            success: true,
            ...storefront
        }
    } catch(e) {
        return {
            success: false,
            message: "Error fetching client config!"
        }
    }
}