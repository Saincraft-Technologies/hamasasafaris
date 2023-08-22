'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Booking extends Model {
    package(){
        return this.belongsTo('App/Models/Package')
    }
    
}

module.exports = Booking
