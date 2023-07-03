'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Booking extends Model {
    attractions(){
        return this.belongsToMany('App/Models/Attraction').pivotTable('booking_attractions')
    }
    
}

module.exports = Booking
