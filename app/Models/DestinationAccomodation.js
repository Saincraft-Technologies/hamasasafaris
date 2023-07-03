'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DestinationAccomodation extends Model {
    facilities(){
        return this.hasMany('App/Models/Facility')
    }
    facilities(){
        return this.hasMany('App/Models/Facility')
    }
}

module.exports = DestinationAccomodation
