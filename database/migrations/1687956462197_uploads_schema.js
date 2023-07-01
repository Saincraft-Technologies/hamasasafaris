'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UploadsSchema extends Schema {
  up () {
    this.create('uploads', (table) => {
      table.increments()
      table.string('filepath', 254).notNullable()
      table.string('metadata', 254)
      table.string('caption', 254)
      table.string('filename', 254)
      table.integer('gallery_id').unsigned().references('id').inTable('galleries')
      table.timestamps()
    })
  }

  down () {
    this.drop('uploads')
  }
}

module.exports = UploadsSchema
