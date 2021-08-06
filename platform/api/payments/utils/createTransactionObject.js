module.exports = (items, amount, subTotal, currency) => {
    items = items.map(item => {
        return {
            name: item.id,
            sku: item.variant,
            price: item.item_price,
            currency,
            quantity: item.quantity
        }
    })

    return [{
        item_list: {
            items
        },
        amount: {
            currency,
            total: amount
        },
        description: ""
    }]
}