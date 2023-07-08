'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionsSchema extends Schema {
  up() {
    this.create('sections', (table) => {
      table.increments()
      table.string('section').notNullable()
      table.string('caption').notNullable()
      table.text('body').notNullable()
      table.string('link', 254).notNullable().defaultTo('/')
      table.integer('article_id').unsigned().references('id').inTable('articles')
      table.integer('upload_id').unsigned().references('id').inTable('uploads')
      table.timestamps()
    })
  }

  down() {
    this.drop('sections')
  }
}

module.exports = SectionsSchema
