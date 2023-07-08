'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DestinationAttraction extends Model {
    destinations() {
        return this.belongsTo('App/Models/Destination')
    }
    attractions() {
        return this.belongsTo('App/Models/Attraction')
    }
}

module.exports = DestinationAttraction
