'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Itinerary extends Model {
    gallery() {
        return this.belongsTo('App/Models/Gallery')
    }
    fromPoint() {
        return this.belongsTo('App/Models/StopPoint', 'from_id', 'id')
    }
    toPoint() {
        return this.belongsTo('App/Models/StopPoint', 'to_id', 'id')
    }
    activities() {
        return this.manyThrough('App/Models/ItineraryActivities', 'activities')
    }
    acommodations() {
        return this.manyThrough('App/Models/ItineraryAccommodation', 'accomodations')
    }

}

module.exports = Itinerary
