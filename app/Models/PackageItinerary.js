'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PackageItinerary extends Model {
    package() {
        return this.belongsTo('App/Models/Package')
    }
    itinerary() {
        return this.belongsTo('App/Models/Itinerary')
    }
}

module.exports = PackageItinerary
