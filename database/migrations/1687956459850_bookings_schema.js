'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingsSchema extends Schema {
  up() {
    this.create('bookings', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable()
      table.string('phone', 18).notNullable()
      table.string('country', 50).notNullable()
      table.integer('travelers', 11).notNullable()
      table.integer('days', 3).notNullable()
      table.string('other_request', 254)
      table.string('identifier', 24)
      table.timestamps()
    })
  }

  down() {
    this.drop('bookings');
  }
}

module.exports = BookingsSchema;
