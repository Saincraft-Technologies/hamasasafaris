'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ItineraryAccommodation extends Model {
    itineraries() {
        return this.belongsTo('App/Models/Itinerary')
    }
    accommodations() {
        return this.belongsTo('App/Models/Accommodation')
    }
}

module.exports = ItineraryAccommodation
