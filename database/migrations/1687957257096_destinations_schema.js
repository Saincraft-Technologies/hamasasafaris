'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DestinationsSchema extends Schema {
  up () {
    this.create('destinations', (table) => {
      table.increments()
      table.string('destination', 100).notNullable()
      table.string('caption', 254)
      table.string('description', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('destinations')
  }
}

module.exports = DestinationsSchema
