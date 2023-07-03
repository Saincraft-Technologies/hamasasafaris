'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingAttractionsSchema extends Schema {
  up () {
    this.create('booking_attractions', (table) => {
      table.increments()
      table.integer('booking_id').unsigned().references('id').inTable('bookings')
      table.integer('attraction_id').unsigned().references('id').inTable('attractions')
      table.timestamps()
    })
  }

  down () {
    this.drop('booking_attractions')
  }
}

module.exports = BookingAttractionsSchema
