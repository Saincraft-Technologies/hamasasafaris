'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DestinationAccomodation extends Model {
    destinations() {
        return this.belongsTo('App/Models/Destination')
    }
    accommodations() {
        return this.belongsTo('App/Models/Accommodation')
    }
}

module.exports = DestinationAccomodation
