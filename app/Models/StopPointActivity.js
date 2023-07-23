'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StopPointActivity extends Model {
    stopPoints() {
        return this.belongsTo('App/Models/StopPoint')
    }
    activities() {
        return this.belongsTo('App/Models/Activity')
    }
}

module.exports = StopPointActivity
