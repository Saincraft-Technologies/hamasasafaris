'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Accommodation extends Model {
    gallery() {
        return this.belongsTo('App/Models/Gallery')
    }
    destinations() {
        return this.manyThrough('App/Models/DestinationAccommodation', 'destinations')
    }
    facilities() {
        return this.manyThrough('App/Models/AccommodationFacility', 'facilities')
    }

}

module.exports = Accommodation
