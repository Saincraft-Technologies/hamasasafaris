'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItineraryAccommodationsSchema extends Schema {
  up() {
    this.create('itinerary_accommodations', (table) => {
      table.increments()
      table.integer('itinerary_id').unsigned().references('id').inTable('itineraries')
      table.integer('accommodation_id').unsigned().references('id').inTable('accommodations')
      table.timestamps()
    })
  }

  down() {
    this.drop('itinerary_accommodations')
  }
}

module.exports = ItineraryAccommodationsSchema
