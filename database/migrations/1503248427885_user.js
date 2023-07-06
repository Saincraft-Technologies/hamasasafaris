'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('firstname', 80)
      table.string('secondname', 80)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('address', 80)
      table.string('gender', 6)
      table.string('role', 60).notNullable().defaultTo('user')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
