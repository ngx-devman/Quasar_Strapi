function checkType(json, seed){ //this checks to see what is being passed in (array, string or json)
    var genreatedJson
    const fs = require('fs')
    if(Array.isArray(json)){
        var genreatedJson = []
        for(item in json){
            var type = typeof json[item]
            if(type == 'string'){
                item = json[item].toLocaleLowerCase();
                const path = '../platform/api/' + item + '/documentation/1.0.0/' + item + '.json'
                if(fs.existsSync(path)){
                    item = require(path)
                    var reutrnedJson = generateFakeData(item, seed)
                    genreatedJson.push(reutrnedJson)
                }
                else{
                    throw new Error('The Json Does Not Exist')
                }
            }
            else if(type == 'object'){
                var reutrnedJson = generateFakeData(json[item], seed)
                genreatedJson.push(reutrnedJson)
            }
        }
        return genreatedJson
    }
    else{
        var genreatedJson
        switch(typeof json){
            case 'string':
                json = json.toLocaleLowerCase();
                const path = '../platform/api/' + json + '/documentation/1.0.0/' + json + '.json'
                if(fs.existsSync(path)){
                    json = require(path)
                    genreatedJson = generateFakeData(json, seed)
                }
                else{
                    throw new Error('The Json Does Not Exist')
                }
            break
            case 'object':
                genreatedJson = generateFakeData(json, seed)
            break
        }
        return genreatedJson
    }
}

function generateFakeData(json, seed) {
    const seedrandom = require('seedrandom')
    const jsf = require('json-schema-faker')
    const Chance = require('chance')

    jsf.option({
        random: seedrandom(String(seed))
    })
    jsf.extend('chance', () => new Chance(Number(seed)))

    var schemas = json.components.schemas
    var modSchema = {}
    for(schema in schemas){
        var modifiedFields = fieldValuesBasedOnName(schemas[schema].properties, jsf)
        modSchema[schema] = modifiedFields
    }
    return jsf.generate(modSchema)
}

function fieldValuesBasedOnName(schema, jsf){ //changes the values based on name so we can generate the correct data
    for(field in schema){
        switch(field.toLocaleLowerCase()){
            case 'id':
                schema[field] = {'type': 'string', 'chance': {'integer': {'min': 1, 'max': 999}}} //sets the field vaules to a string containg a random number from 1 to 999
            break
            case 'name':
                schema[field] = {'type': 'string', 'chance': {'name': {'nationality': 'en'}}} //sets the field value to a radnom english name
            break
            case 'creator':
                schema[field] = {'type': 'string', 'chance': {'name': {'nationality': 'en'}}} //sets the field value to a random english name
            break
            case 'size':
                schema[field] = {'type': 'string', 'chance': {'floating': {'min': 1, 'max': 999}}} //sets the value to a string with a value of a random floating number between 1 and 999
            break
            case 'url':
                schema[field] = {'type': 'string', 'chance': {'url': {'domain': 'api-dev.sourcesync.io'}}} //sets the vaule to a string containg a random url with the domain set as api-dev.sourcesync.io
            break
            case 'username':
                schema[field] = {'type': 'string', 'chance': 'word'} //sets the value as a string containing a random word
            break
            case 'email':
                schema[field] = {'type': 'string', 'chance': {'email': {'domain': 'sourcedigital.net'}}} //sets the value as a sting containg a email with the domain set to sourcedigital.net
            break
            case 'data':
                const dataObject = require('./schemas/product-1.json')
                schema[field] = generateDataOject(dataObject, jsf)
            break

        }
        if(schema[field].properties != undefined){
            var modSchema = schemaInSchema(schema[field].properties, jsf)
            schema[field] = modSchema
        }
        if(schema[field].items != undefined && schema[field].items.properties != undefined){
            var modSchema = schemaInSchema(schema[field].items.properties, jsf)
            schema[field] = modSchema
        }
    }
    return schema
}

function generateDataOject(dataObject, jsf){ //generates schema for data objects
    for(field in dataObject.properties){
        if(dataObject.properties[field].type == 'object'){
            if(dataObject.properties[field].properties != undefined){
                dataObject.properties[field] = jsf.generate(dataObject.properties[field].properties)
            }
            else{
                dataObject.properties[field] = jsf.generate(dataObject.properties[field])
            }
        }
    }
    return dataObject.properties
}

function schemaInSchema(schema, jsf){ //if there is a schema in a schema this will be called to generate that schema
    var modSchema = fieldValuesBasedOnName(schema, jsf)
    return modSchema
}
module.exports = checkType