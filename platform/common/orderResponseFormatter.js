module.exports = (response, platform) => {
    if(platform == "magento") {
        const orders = response.items.map((item) => {
            return {
                id: item.entity_id,
                note: null,
                email: item.customer_email,
                taxes_included: null,
                currency: item.base_currency_code,
                invoice_sent_at: null,
                created_at: item.created_at,
                updated_at: item.updated_at,
                tax_exempt: null,
                completed_at: null,
                name: null,
                status: item.status,
                line_items: item.items,
                shipping_address: item.extension_attributes.shipping_assignments[0].shipping.address,
                billing_address: item.billing_address,
                invoice_url: null,
                applied_discount: null,
                order_id: null,
                shipping_line: null,
                tax_lines: [],
                tags: "",
                note_attributes: [],
                total_price: item.payment.amount_ordered,
                subtotal_price: item.payment.base_amount_ordered,
                total_tax: item.tax_amount,
                customer: {
                    name: item.customer_firstname + item.customer_lastname,
                    email: item.customer_email
                }
            }
        })
        return {
            orders 
        }
    } else if(platform == "wooCommerce") {
        const orders = response.map((item) => {
            return {
                id: item.id,
                note: null,
                email: item.billing.email,
                taxes_included: item.prices_include_tax,
                currency: item.currency,
                invoice_sent_at: null,
                created_at: item.date_created,
                updated_at: item.date_modified,
                tax_exempt: null,
                completed_at: item.date_completed,
                name: null,
                status: item.status,
                line_items: item.line_items,
                shipping_address: item.shipping,
                billing_address: item.billing,
                invoice_url: null,
                applied_discount: item.discount_total,
                order_id: item.order_key,
                shipping_line: item.shipping_lines,
                tax_lines: item.tax_lines,
                tags: "",
                note_attributes: [],
                total_price: item.total,
                subtotal_price: item.total,
                total_tax: item.total_tax,
                customer: null
            }
        })
        return {
            orders 
        }
    }
}