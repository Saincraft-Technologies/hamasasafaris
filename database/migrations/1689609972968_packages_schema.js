'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackagesSchema extends Schema {
  up() {
    this.create('packages', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('description').unique()
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('packages')
  }
}

module.exports = PackagesSchema
