const {environments} = require('../constants')
module.exports = ({ env }) => ({
    taxratesAPIKey: "0FTfcRQgLH1hXU2RCLHxYIZAvIIZUVoo94vXK5",
    environments,
    paymentMethods: [
        "stripe",
        "paypal"
    ]
});