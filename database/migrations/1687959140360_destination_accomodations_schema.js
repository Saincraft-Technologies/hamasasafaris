'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DestinationAccomodationsSchema extends Schema {
  up() {
    this.create('destination_accomodations', (table) => {
      table.increments()
      table.integer('destination_id').unsigned().references('id').inTable('destinations')
      table.integer('accomodation_id').unsigned().references('id').inTable('accommodations')
      table.integer('upload_id').unsigned().references('id').inTable('uploads')
      table.timestamps()
    })
  }

  down() {
    this.drop('destination_accomodations')
  }
}

module.exports = DestinationAccomodationsSchema
