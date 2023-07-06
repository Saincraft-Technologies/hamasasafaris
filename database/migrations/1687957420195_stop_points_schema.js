'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StopPointsSchema extends Schema {
  up() {
    this.create('stop_points', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('caption', 254)
      table.text('description')
      table.integer('gallery_id').unsigned().references('id').inTable('galleries')
      table.timestamps()
    })
  }

  down() {
    this.drop('stop_points')
  }
}

module.exports = StopPointsSchema
