module.exports = async (cart) => {
    try {
        let subTotal = 0, totalAmount = 0, shipping = 0, tax = 0

        cart.items.forEach(item => {
            subTotal += item.price
        })

        // shipping = cart.settings.shipping_price || 0
        // tax = cart.settings.tax || 0

        // totalAmount = subTotal + tax + shipping

        totalAmount = subTotal
        return {
            success: true,
            totalAmount,
            subTotal,
            message: "Order amount cannot be zero!"
        } 
    } catch(e) {
        return {
            success: false,
            message: e.message
        }
    }
}