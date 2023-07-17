'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PackageItinerary extends Model {
    packages() {
        return this.belongsTo('App/Models/Package')
    }
    Itineraries() {
        return this.belongsTo('App/Models/Itinerary')
    }
}

module.exports = PackageItinerary
