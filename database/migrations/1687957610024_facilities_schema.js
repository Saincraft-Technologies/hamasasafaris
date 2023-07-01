'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FacilitiesSchema extends Schema {
  up () {
    this.create('facilities', (table) => {
      table.increments()
      table.string('facility', 100).notNullable()
      table.string('caption', 254)
      table.string('services', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('facilities')
  }
}

module.exports = FacilitiesSchema
