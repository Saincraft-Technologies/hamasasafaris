'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccommodationsSchema extends Schema {
  up() {
    this.create('accommodations', (table) => {
      table.increments()
      table.string('accommodation', 100).notNullable()
      table.string('type', 100).notNullable()
      table.string('address', 80)
      table.string('phone', 24)
      table.text('caption')
      table.text('description')
      table.integer('gallery_id').unsigned().references('id').inTable('gallery_id')
      table.timestamps()
    })
  }

  down() {
    this.drop('accommodations')
  }
}

module.exports = AccommodationsSchema
