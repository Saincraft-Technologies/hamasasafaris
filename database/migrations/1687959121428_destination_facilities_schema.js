'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccommodationFacilitiesSchema extends Schema {
  up() {
    this.create('accommodation_facilities', (table) => {
      table.increments()
      table.integer('accommodation_id').unsigned().references('id').inTable('accommodations')
      table.integer('facility_id').unsigned().references('id').inTable('facilities')
      table.integer('upload_id').unsigned().references('id').inTable('uploads')
      table.timestamps()
    })
  }

  down() {
    this.drop('accommodation_facilities')
  }
}

module.exports = AccommodationFacilitiesSchema
