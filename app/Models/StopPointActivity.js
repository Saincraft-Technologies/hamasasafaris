'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StopPointActivity extends Model {
    stopPoint() {
        return this.belongsTo('App/Models/StopPoint')
    }
    activity() {
        return this.belongsTo('App/Models/Activity')
    }
}

module.exports = StopPointActivity
