import Ajv from 'ajv'
import { util } from 'experience-engine'
import product1 from './schema/product-1.js'
import legacy from './schema/legacy.js'
const ajv = new Ajv({ allErrors: true })
import { uid } from 'quasar'

// Precompile all schemas for the fastest validation...
const validate = {
  product: {
    1: ajv.compile(product1)
  },
  legacy: ajv.compile(legacy)
}

function convertMetacontentV2 (thing, startTimeMs, endTimeMs, position, instanceId) {
  return {
    ...thing,
    meta: {
      ...(thing.meta ? thing.meta : {}),
      display: thing.meta.display || thing.name,
      preview: thing?.meta?.data?.settings?.preview // TODO cleanup
    },
    instanceId,
    startTimeMs,
    endTimeMs,
    duration: endTimeMs - startTimeMs,
    position
  }
}

export default (dependencies) => {
  const { store, Vue } = dependencies
  const debug = Vue.prototype.$debug.extend(`validation`)

  /**
   * Validates activations
   * @todo should this be debug/dev mode only?
   * @param {*} things
   */
  function validateAndReport (things) {
    debug('Validating things...')

    // Make a reporting object of arrays...
    const report = {
      valid: [],
      invalid: [],
      missingType: [],
      error: [],
      legacy: []
    }

    // Go through each thing and make sure it's valid...
    things.forEach((thing, index) => {
    // If a version exists, we can validate it...
      if (thing.version === 1) {
        try {
        // Try to validate the thing...
          if (typeof validate[thing.type] === 'undefined') {
          // debug(`Thing ${index}'s type (${thing.type}) doesn't exist'!`)
            report.missingType.push(thing)
            store.commit('config/error', `This version doesn't understand thing ${index}'s type ("${thing.type}").`)
          } else if (validate[thing.type][thing.version](thing)) {
          // debug(`Thing ${index} is valid!`)
            report.valid.push(thing)
          } else {
            console.warn(`Thing ${index} is invalid for the following reasons:`, validate[thing.type][thing.version].errors)
            report.invalid.push(thing)
            store.commit('config/error', `Thing ${index} is not a valid v${thing.version} ${thing.type}.`)
          }
        } catch (e) {
        // debug(`Thing ${index} caused an error!`, e)
          report.error.push(thing)
          store.commit('config/error', `An error occurred trying to validate thing ${index} (${e.message})`)
        }
      } else if (thing.version === 2) {
        report.valid.push(thing)
      } else {
      // debug(`Thing ${index} has no version/type`)
        report.legacy.push(thing)
      }
    })
    debug('Validation report:', util.omitBy(report, e => !e.length))
  }

  return {
    // Validate all the things...
    validate: (things = []) => {
      validateAndReport(things, debug, store)

      // This remaps things according to internal specs...
      debug('Remapping things...')
      const mapped = things.map((thing) => {
        // If it's a new thing, remap it...
        switch (thing.version) {
          case 2:
            if (thing.instances) {
              return thing.instances
                .filter(instance => instance.active !== false)
                .map((instance) => convertMetacontentV2(thing, instance.when.start, instance.when.end, instance.position, instance.id || uid()))
            } else if (thing.meta) {
              return convertMetacontentV2(thing, thing.meta.start, thing.meta.end, thing.meta.position, thing.meta.active, uid())
            } else return null
          case 1:
            return util.map(thing, product1.map.toLegacy)
          default:
            return thing
        }
      }).filter(i => !!i).flat(2)

      debug('Remapped things:', mapped)
      return mapped
    }
    // Maps any newer things to legacy format...
    // TODO: Update the codebase and map this the other way around...
  }
}
