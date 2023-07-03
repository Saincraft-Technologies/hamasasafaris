'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DestinationAttractionsSchema extends Schema {
  up () {
    this.create('destination_attractions', (table) => {
      table.increments()
      table.integer('destination_id').unsigned().references('id').inTable('destinations')
      table.integer('attraction_id').unsigned().references('id').inTable('attractions')
      table.timestamps()
    })
  }

  down () {
    this.drop('destination_attractions')
  }
}

module.exports = DestinationAttractionsSchema
