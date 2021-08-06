module.exports = async (cart) => {
    try {
        const paymentMethod = cart.settings.paymentMethod

        if(!paymentMethod || !strapi.config.get("custom.paymentMethods").includes(paymentMethod)) {
            return {
                success: false,
                message: "Payment method not found!"
            }
        }

        const distribution = await strapi.query("distribution").findOne({ id: cart.settings.distributionID })

        if(!distribution) {
            return {
                success: false,
                message: "Distribution not found!"
            }
        }
        
        const paymentSettings = distribution.settings.ecommerce ? distribution.settings.ecommerce.storefronts[paymentMethod] : null
        
        if(!paymentSettings || !paymentSettings.storefrontId) {
            return {
                success: false,
                message: "Payment settings not found!"
            }
        }

        const paymentStorefront = await strapi.query("apps").findOne({ id: paymentSettings.storefrontId })

        if(!paymentStorefront) {
            return {
                success: false,
                message: "Payment Storefront not found!"
            }
        }

        const config = paymentStorefront.settings

        return {
            success: true,
            config,
            paymentMethod
        }
    } catch(e) {
        return {
            success: false,
            message: e.message || "Something went wrong!"
        }
    }
}