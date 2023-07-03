'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attraction extends Model {
    destination() {
        return this.belongsToMany('App/Models/Destination').pivotTable('destination_attractions')
    }
}

module.exports = Attraction
