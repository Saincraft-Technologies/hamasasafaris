'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Itinerary extends Model {
    gallery() {
        return this.belongsTo('App/Models/Gallery')
    }
    packageItineraries() {
        return this.belongsTo('App/Models/PackageItinerary')
    }
    fromPoint() {
        return this.belongsTo('App/Models/StopPoint', 'from_id', 'id')
    }
    toPoint() {
        return this.belongsTo('App/Models/StopPoint', 'to_id', 'id')
    }
    activities() {
        return this.manyThrough('App/Models/ItineraryActivity', 'activities')
    }
    packages() {
        return this.manyThrough('App/Models/PackageItinerary', 'packages')
    }
    acommodations() {
        return this.manyThrough('App/Models/ItineraryAccommodation', 'accomodations')
    }

}

module.exports = Itinerary
