'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Itinerary extends Model {
    fromPoint() {
        return this.hasMany('App/Models/StopPoint', 'id', 'from_id').pivotTable('stop_points')
    }
    toPoint() {
        return this.hasMany('App/Models/StopPoint', 'id', 'to_id').pivotTable('stop_points')
    }
}

module.exports = Itinerary
