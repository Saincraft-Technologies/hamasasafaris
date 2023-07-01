'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingsSchema extends Schema {
  up() {
    this.create('bookings', (table) => {
      table.increments()
      table.string('fullname', 254).notNullable()
      table.string('email', 254).notNullable()
      table.integer('adults', 11).notNullable().defaultTo(0)
      table.integer('children', 11).notNullable().defaultTo(0)
      table.integer('days', 11).notNullable().defaultTo(0)
      table.integer('language', 25).notNullable().defaultTo(0)
      table.integer('nationality', 50).notNullable().defaultTo(0)
      table.string('other_request', 254)
      table.string('identifier', 24)
      table.string('status', 24).notNullable().defaultTo('plan')
      table.timestamps()
    })
  }

  down() {
    this.drop('bookings');
  }
}

module.exports = BookingsSchema;
