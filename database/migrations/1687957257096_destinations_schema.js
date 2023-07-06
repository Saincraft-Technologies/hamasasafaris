'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DestinationsSchema extends Schema {
  up () {
    this.create('destinations', (table) => {
      table.increments()
      table.string('destination', 100).notNullable()
      table.string('caption', 254)
      table.text('description')
      table.integer('gallery_id').unsigned().references('id').inTable('galleries')
      table.timestamps()
    })
  }

  down () {
    this.drop('destinations')
  }
}

module.exports = DestinationsSchema
