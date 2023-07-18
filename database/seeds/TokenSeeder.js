'use strict'

/*
|--------------------------------------------------------------------------
| TokenSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const fs = require('fs');
const path = require('path');

class TokenSeeder {
  async run() {

    /** Read data from json file */
    const DBTokens = JSON.parse(fs.readFileSync(`${path.resolve('../hamasa_db.json/hamasa_db_table_destinations.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Token = use('App/Models/Token');
    /** loop through the data */
    try {
      for (const item of DBTokens.data) {
        /** Insert data one by one!  */
        let items = new Token();
        items.id = item.id;
        items.user_id = item.user_id;
        items.token = item.token;
        items.type = item.type;
        items.is_revoked = item.is_revoked;
        items.created_at = item.created_at;
        await items.save();
      }
      /** A completion message */
      console.log("x--------- successfully seeded tokens! --------x");
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = TokenSeeder
