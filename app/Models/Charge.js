'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Charge extends Model {
    itinerary() {
        return this.belongsTo('App/Models/Itinerary')
    }
}
module.exports = Charge
