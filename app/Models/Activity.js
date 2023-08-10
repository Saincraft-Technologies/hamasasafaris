'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Activity extends Model {
    article() {
        return this.belongsTo('App/Models/Article')
    }
    stopPoints() {
        return this.manyThrough('App/Models/StopPointActivity', 'stopPoint')
    }
}

module.exports = Activity
