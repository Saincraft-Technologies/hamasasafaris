'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Destination extends Model {
    facilities(){
        return this.hasMany('App/Models/Facility').pivotTable('destination_facilities')
    }
    attractions(){
        return this.hasMany('App/Models/Attraction').pivotTable('destination_attractions')
    }
}

module.exports = Destination
