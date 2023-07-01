'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitiesSchema extends Schema {
  up() {
    this.create('activities', (table) => {
      table.increments()
      table.string('activity', 100).notNullable()
      table.string('duration', 100).notNullable()
      table.string('description', 254)
      table.timestamps()
    })
  }

  down() {
    this.drop('activities')
  }
}

module.exports = ActivitiesSchema
