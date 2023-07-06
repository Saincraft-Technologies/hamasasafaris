'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DestinationAttraction extends Model {
    destination() {
        return this.hasMany('App/Models/Destination')
    }
    attaction() {
        return this.hasMany('App/Models/Attraction')
    }
}

module.exports = DestinationAttraction
