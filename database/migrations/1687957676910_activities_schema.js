'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitiesSchema extends Schema {
  up() {
    this.create('activities', (table) => {
      table.increments()
      table.string('activity', 100).notNullable()
      table.string('duration', 100).notNullable()
      table.text('description')
      table.integer('article_id').unsigned().references('id').inTable('articles')
      table.timestamps()
    })
  }

  down() {
    this.drop('activities')
  }
}

module.exports = ActivitiesSchema
