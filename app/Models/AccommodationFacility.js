'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AccommodationFacility extends Model {
    facilities() {
        return this.belongsTo('App/Models/Facility')
    }
    Accommodations() {
        return this.belongsTo('App/Models/Accommodation')
    }
}

module.exports = AccommodationFacility
