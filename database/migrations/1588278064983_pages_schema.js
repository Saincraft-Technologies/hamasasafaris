'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagesSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.increments()
      table.string('page', 254).notNullable()
      table.string('route', 254).notNullable().defaultTo('/')
      table.string('title', 254).notNullable()
      table.string('status', 24).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PagesSchema
