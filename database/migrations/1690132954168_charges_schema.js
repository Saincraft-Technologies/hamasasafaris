'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChargesSchema extends Schema {
  up() {
    this.create('charges', (table) => {
      table.increments()
      table.string('charge').notNullable();
      table.double('amount').notNullable();
      table.double('discount').notNullable().defaultTo(0);
      table.string('description').notNullable();
      table.integer('itinerary_id').unsigned().references('id').inTable('itineraries')
      table.timestamps()
    })
  }

  down() {
    this.drop('charges')
  }
}

module.exports = ChargesSchema
