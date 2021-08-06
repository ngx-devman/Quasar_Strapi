"use strict";

/**
 * Read the documentation () to implement custom controller functions
 */

const asyncForEach = require("../utils/asyncForEach")
const checkImportFormat = require("../utils/checkImportFormat")
const NBCUNI_Format = require("../utils/NBCUNI_Format.json")

module.exports = {
  types: async ctx => {
    console.log('TYPES')
    const types = await strapi.query("importtypes").find()
    return types
  },
  import: async ctx => {
      try {   
      const csvJson = ctx.request.body

      if(csvJson.length < 0) {
        return {
          success: false,
          message: "Missing csv data!"
        }
      }

      let correctFormat = checkImportFormat(Object.keys(NBCUNI_Format), Object.keys(csvJson[0]))

      if(!correctFormat) {
        return {
          success: false,
          message: `Invalid CSV format. ` 
        }
      }

      let createCount = 0, updateCount = 0;
      
      let distribution = await strapi.query("distribution").findOne({
        id: ctx.params.id
      })

      if(!distribution) {
        return {
          success: false,
          message: "Distribution not found!"
        }
      }
      
      const activations = Array.isArray(distribution.data) ? distribution.data : []

      const importHelper = async (data) => { 
        let f = 0;
        for(let j = 0; j < activations.length; j++) {
          if(activations[j].production === data.OID) {
            activations[j] = data
            updateCount++;
            f = 1;
            break;
          }
        }

        if(f) return
          
        activations.push(data)
        createCount++;
      }
      
      await asyncForEach(csvJson, importHelper);
      
      await strapi.query('distribution').update({
        id: ctx.params.id
      }, {
        data: activations
      })

      return {
        success: true,
        createCount,
        updateCount
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};