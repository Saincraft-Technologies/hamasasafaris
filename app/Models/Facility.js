'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Facility extends Model {
    destination(){
        return this.belongsTo('App/Models/Destination').pivotTable('destination_facilities')
    }
}

module.exports = Facility
