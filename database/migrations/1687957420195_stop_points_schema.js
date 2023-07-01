'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StopPointsSchema extends Schema {
  up() {
    this.create('stop_points', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('caption', 254)
      table.string('description', 254)
      table.integer('upload_id').unsigned().references('id').inTable('uploads')
      table.timestamps()
    })
  }

  down() {
    this.drop('stop_points')
  }
}

module.exports = StopPointsSchema
