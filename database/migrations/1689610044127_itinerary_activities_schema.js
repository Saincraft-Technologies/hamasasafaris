'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItineraryActivitiesSchema extends Schema {
  up() {
    this.create('itinerary_activities', (table) => {
      table.increments()
      table.integer('itinerary_id').unsigned().references('id').inTable('itineraries')
      table.integer('activity_id').unsigned().references('id').inTable('activities')
      table.timestamps()
    })
  }

  down() {
    this.drop('itinerary_activities')
  }
}

module.exports = ItineraryActivitiesSchema
