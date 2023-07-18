'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackageItinerariesSchema extends Schema {
  up() {
    this.create('package_itineraries', (table) => {
      table.increments()
      table.string('day').notNullable()
      table.integer('package_id').unsigned().references('id').inTable('packages')
      table.integer('itinerary_id').unsigned().references('id').inTable('itineraries')
      table.timestamps()
    })
  }

  down() {
    this.drop('package_itineraries')
  }
}

module.exports = PackageItinerariesSchema
