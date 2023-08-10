'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StopPoint extends Model {
    gallery() {
        return this.belongsTo('App/Models/Gallery')
    }
    activities() {
        return this.manyThrough('App/Models/StopPointActivity', 'activity')
    }
}

module.exports = StopPoint
