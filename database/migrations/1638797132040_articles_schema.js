'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticlesSchema extends Schema {
  up() {
    this.create('articles', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.string('source', 254)
      table.string('author', 254).notNullable()
      table.boolean('visible').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('articles')
  }
}

module.exports = ArticlesSchema
