'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Accommodation extends Model {
    destination() {
        return this.belongsToMany('App/Models/Destination').pivotTable('destination_accomodations')
    }
    facility() {
        return this.belongsToMany('App/Models/Facility').pivotTable('accomodation_facilities')
    }

}

module.exports = Accommodation
