'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Facility extends Model {
    gallery() {
        return this.belongsTo('App/Models/Gallery')
    }
    destination(){
        return this.belongsTo('App/Models/Destination').pivotTable('destination_facilities')
    }
}

module.exports = Facility
