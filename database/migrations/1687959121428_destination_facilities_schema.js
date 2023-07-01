'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DestinationFacilitiesSchema extends Schema {
  up () {
    this.create('destination_facilities', (table) => {
      table.increments()
      table.integer('destination_id').unsigned().references('id').inTable('destinations')
      table.integer('facility_id').unsigned().references('id').inTable('facilities')
      table.integer('upload_id').unsigned().references('id').inTable('uploads')
      table.timestamps()
    })
  }

  down () {
    this.drop('destination_facilities')
  }
}

module.exports = DestinationFacilitiesSchema
