'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NavigationsSchema extends Schema {
  up() {
    this.create('navigations', (table) => {
      table.increments()
      table.string('display_name', 50).unique().notNullable()
      table.string('route', 254).notNullable().defaultTo('/')
      table.string('parent', 2).notNullable().defaultTo('#')
      table.string('icon', 254).notNullable().defaultTo('mdi mdi-home')
      table.integer('oder', 2).notNullable().defaultTo('0')
      table.timestamps()
    })
  }

  down() {
    this.drop('navigations')
  }
}

module.exports = NavigationsSchema
