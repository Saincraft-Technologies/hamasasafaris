'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttractionsSchema extends Schema {
  up() {
    this.create('attractions', (table) => {
      table.increments()
      table.string('attraction', 100).notNullable()
      table.string('caption', 254)
      table.text('description')
      table.integer('gallery_id').unsigned().references('id').inTable('galleries')
      table.integer('article_id').unsigned().references('id').inTable('articles')
      table.timestamps()
    })
  }

  down() {
    this.drop('attractions')
  }
}

module.exports = AttractionsSchema
