'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Package extends Model {
    itineraries() {
        return this.manyThrough('App/Models/PackageItinerary', 'itinerary')
    }
    packageItinerary() {
        return this.belongsTo('App/Models/PackageItinerary')
    }
    bookings() {
        return this.hasMany('App/Models/Booking')
    }
}

module.exports = Package
