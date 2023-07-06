'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DestinationAccomodation extends Model {
    destination() {
        return this.hasMany('App/Models/Destination')
    }
    accommodation() {
        return this.hasMany('App/Models/Accommodation')
    }
}

module.exports = DestinationAccomodation
