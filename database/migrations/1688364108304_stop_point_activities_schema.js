'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StopPointActivitiesSchema extends Schema {
  up() {
    this.create('stop_point_activities', (table) => {
      table.increments()
      table.integer('activity_id').unsigned().references('id').inTable('activities')
      table.integer('stop_point_id').unsigned().references('id').inTable('stop_points')
      table.timestamps()
    })
  }

  down() {
    this.drop('stop_point_activities')
  }
}

module.exports = StopPointActivitiesSchema
