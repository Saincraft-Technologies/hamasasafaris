'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttractionsSchema extends Schema {
  up() {
    this.create('attractions', (table) => {
      table.increments()
      table.string('attraction', 100).notNullable()
      table.string('caption', 254)
      table.string('description', 254)
      table.integer('upload_id').unsigned().references('id').inTable('uploads')
      table.timestamps()
    })
  }

  down() {
    this.drop('attractions')
  }
}

module.exports = AttractionsSchema
