'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Package extends Model {
    itineraries() {
        return this.manyThrough('App/Models/PackageItinerary', 'itineraries')
    }
}

module.exports = Package
