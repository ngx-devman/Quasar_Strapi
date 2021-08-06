
const axios = require('axios')
const timer = require('./Experience-common').timer()
const _ = require('lodash')

module.exports = async function (ctx, payload) {
  // Strategy pattern - This is a fast, simple and DRY replacement for if and switch blocks...
  const strategy = {
    // The "proxy" method type - just parrot stuff to the destination (defined in the distribution itself)...
    async proxy (name, payload) {
      console.log('Proxying', name, methods[name].settings)
      const data = await axios(methods[name].settings) // Proxy it
      return data // Return it
    },
    // The "map" method type - Like proxy, but re-maps or otherwise processes the results...
    async map (name, payload) {
      console.log('mapping', name, methods[name].settings.method)
      const result = await this.proxy(methods[name].settings.method) // Harness the proxy provided in the methods settings.method path
      console.log('proxy success')
      let logOut = ''
      const offers = []
      for (const offerIndex of Object.keys(result.data)) {
        let offer = result.data[offerIndex]
        // Each offer that is "single" gets processed...
          const title = offer.title[0]
          // Drop the interesting stuff into the new offer...
          const newOffer = {
            // Load in the offer title...
            eidr: title['EIDR'],
            offerReason: title['Offer Reason'],
            postOrderInstructions: title['Post Order Instructions'],
            retail: title['Retail Price'],
            sku: title['SKU Name'],
            sale: title['Sale Price'],
            title: title['SKU Name'], // Change 6/29/20
            description: title['Offer Description'], // Change 6/29/20
            releaseDate: title['Copyright'], // Change 6/29/20
            rating: title['MPAA Rating'], // Change 6/29/20
            boxart: title['Box Art'], // Change 6/29/20
            heroImage: title['Hero Image'], // Change 6/29/20
            format: title['Fomat'], // Change 6/29/20
            format: title['Format'], // Change 6/29/20
            // Now the actual offer...
            codeStart: offer['Code Start Date'],
            codeEnd: offer['Code End Date'],
            promoStart: offer['Promo Start Date'],
            promoEnd: offer['Promo End Date'],
            offerId: offer['Offer ID'],
            offerName: offer['Offer Name'],
            type: offer['SKU Type [Single, Bundle, Choice]']
          }
          logOut += `Adding ${newOffer.title} `
          // Get rid of Bundle/Choice "_1"/"_2" etc...
          if (offer['SKU Type [Single, Bundle, Choice]'].startsWith('Bundle')) newOffer.type = "Bundle"
          if (offer['SKU Type [Single, Bundle, Choice]'].startsWith('Choice')) newOffer.type = "Choice"
          logOut += `which is a ${newOffer.type}: `

          // Now get the production that matches the EIDR...
          const production = await strapi.query('production').findOne({ clientId: newOffer.eidr })
          if(!production){
            return { 
              success: false,
              error: `The EIDR ${newOffer.eidr} does not exist.`
            }  
          }

          // Modify production.settings for genre, credits and minutes...

          // If "Genre" is a string, make it an array and replace settings.genres"...
          if (title['Genre']) {
            logOut += 'Genre override, '
            production.settings.genres = title['Genre'].split(',')
          }

          // Fix minutes (from "Runtime", convert from hh:mm:ss format to minutes)..
          if (title['Runtime']) {
            let hrs = title['Runtime'].split(':')[0]
            let mins = title['Runtime'].split(':')[1]
            production.settings.runtime = (parseInt(hrs) * 60) + parseInt(mins)
            logOut += `Runtime override (${title['Runtime']} = ${production.settings.runtime}), `
          }

          // Handle Bubdle/Choice specially...
          if (['Bundle', 'Choice'].includes(newOffer.type)) {
            logOut += '( Bundle/Choice title redaction) '
            console.log(newOffer)
            newOffer.titles = offer.title  // Add all the titles in the list
            // Remove the title description, credits, genre, rating, year, runtime, title...
            production.settings.title = ''
            production.settings.description = ''
            production.settings.credits = ''
            //production.settings.genres = []
            production.settings.rating = ''
            production.settings.releaseDate = ''
            //production.settings.runtime = ''
            production.settings.boxart = ''
            production.settings.heroImage = ''
          }

          // If the title has "Actors" (a string), replace the "credits" with "cast" tags with this field...
          if (title['Actors']) {
            logOut += `Actors override (${title['Actors']}), `
            newOffer.cast = title['Actors']
          } else {
            let newCredits = []            
            for (let credit of production.settings.credits) if (credit.creditType === 'Cast') newCredits.push(credit)
            newOffer.cast = newCredits
          }
          // If the title has "Crew" (a string), replace the "credits" with anything other than "cast" tags with this field...
          if (title['Crew']) {
            logOut += `Crew override, (${title['Crew']}), `
            newOffer.crew = title['Crew']
          } else {
            // If no crew, store the MA crew credits in crew, so it exists no matter what...
            let newCredits = []            
            for (let credit of production.settings.credits) if (credit.creditType !== 'Cast') newCredits.push(credit)
            newOffer.crew = newCredits
          }

          // Merge MA (production.settings) with their offer, combined with the first title...
          const temp = _.merge({}, production.settings, newOffer)
          offers.push(temp)
          console.log(logOut + '\n')
          logOut = ''
      }

      // Finally, the offers are normalized and ready to go, we just have to convert them to activations...
      const activations = []
      for (const offer of offers) {
        activations.push({
          target: '',
          dataObject: {
            mainImageUrl: offer.boxart.includes(".jpg") ? offer.boxart : (offer.boxart + ".jpg"),
            media: [
              { url: offer.heroImage.includes(".jpg") ? offer.heroImage : (offer.heroImage + ".jpg") }
            ],
            data: {
              cast: offer.cast,
              crew: offer.crew,
              genre: offer.genres.join(', '),
              durect_checkout_enable: true,
              order: 1000,
              duration: offer.runtime + ' Minutes',
              format: offer.format,
              studio: offer.studios[0].name,
              embedUrl: '',
              lowestPrice: offer.sale,
              name: offer.title,
              basePrice: offer.retail,
              description: offer.description,
              year: offer.releaseDate, // Will need to address the extra detail
              rating: offer.rating,
              externalProductId: offer.offerId,
              externalCatalog: "nbcDMD",
              credits: offer.credits, // We need to address the fact its now an array of objects
            },
            dataTypeName: 'product',
            name: offer.title,
            type: 'title',
            id: offer.slug.replace('/movie/',''),
            endTimeUtc: null,
            dataTypeId: 'unused/depreciated'
          },
          id: offer.offerId,
          endTimeUtc: null,
          name: offer.title,
          dataTypeName: 'product',
          dataTypeId: 'unused/depreciated',
          offerType: offer.type,
          type: 'title',
        })
      }

      /*
      console.log('Titles:', nbcTitles.length)
      //const newTitles = []
      //newTitles.push(nbcTitles[0])
      //newTitles.push(nbcTitles[1])
      setTimeout(slowly, 100)
      let i = 0
      async function slowly() {
        console.log('Whew', nbcTitles[i].title)
        const createResult = await strapi.query('production').create({
          name: nbcTitles[i].title,
          clientId: nbcTitles[i].eidr,
          settings: nbcTitles[i]
        })
        i++
        if (i < nbcTitles.length) setTimeout(slowly, 100)
      }
    
      /*
      nbcTitles.forEach(async title => {
        const settings = JSON.parse(JSON.stringify(title))
        // Get it ready to save...
        console.log('Saving', title.title, title.eidr)
        const createResult = await strapi.query('production').create({
          name: settings.title,
          clientId: settings.eidr,
          settings
        })
      })
      */
      // Map the data as defined...
      return { data: activations } // return the mapped data
    }
  }
  timer.start()
  console.log('starting...')
  const methods = payload.config.data.distribution.hidden.methods
  const name = ctx.params.name
  if (methods[name]) {
    const type = methods[name].type
    if (strategy[type]) {
      const response = await strategy[type](name, payload)
      const size = JSON.stringify(response.data).length
      console.log(`Method ${name} executed in ${timer.end()}ms and returned ${size} bytes`)
      return response.data
    } else {
      return {
        success: false,
        error: 'The method type does not exist.'
      }
    }
  } else {
    return {
      success: false,
      error: "The method does not exist."
    }
  }
}
