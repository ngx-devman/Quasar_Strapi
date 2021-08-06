const config = require('config')
const tom = require('tom-microservice')(config)
const { payment, email } = tom
