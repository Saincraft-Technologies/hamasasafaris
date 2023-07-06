'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AccommodationFacility extends Model {
    facility() {
        return this.hasMany('App/Models/Facility')
    }
    Accommodation() {
        return this.hasMany('App/Models/Accommodation')
    }
}

module.exports = AccommodationFacility
