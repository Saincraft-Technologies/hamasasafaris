'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItinerariesSchema extends Schema {
  up() {
    this.create('itineraries', (table) => {
      table.increments()
      table.integer('from_id').unsigned().references('id').inTable('stop_points')
      table.integer('to_id').unsigned().references('id').inTable('stop_points')
      table.integer('destination_id').unsigned().references('id').inTable('destinations')
      table.string('distance', 100).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('itineraries')
  }
}

module.exports = ItinerariesSchema
