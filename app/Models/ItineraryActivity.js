'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ItineraryActivity extends Model {
    itineraries() {
        return this.belongsTo('App/Models/Itinerary')
    }
    activities() {
        return this.belongsTo('App/Models/Activity')
    }
}

module.exports = ItineraryActivity
