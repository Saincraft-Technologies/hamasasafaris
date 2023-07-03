'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Activity extends Model {
    stopPoints(){
        return this.belongsToMany('App/Models/StopPoint').pivotTable('stop_point_activities')
    }
}

module.exports = Activity
