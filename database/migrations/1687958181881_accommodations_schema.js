'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccommodationsSchema extends Schema {
  up () {
    this.create('accommodations', (table) => {
      table.increments()
      table.string('accommodation', 100).notNullable()
      table.string('type', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('accommodations')
  }
}

module.exports = AccommodationsSchema
