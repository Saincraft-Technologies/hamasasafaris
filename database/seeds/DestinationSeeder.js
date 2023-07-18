'use strict'

/*
|--------------------------------------------------------------------------
| DestinationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database');
const path = require('path');
const fs = require('fs');

class DestinationSeeder {
  async run() {
    /** Read data from json file */
    const DBDestinations = JSON.parse(fs.readFileSync(`${path.resolve('../hamasa_db.json/hamasa_db_table_destinations.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Destination = use('App/Models/Destination');
    /** loop through the data */
    try {

      for (const item of DBDestinations.data) {
        /** Insert data one by one!  */
        let items = new Destination();
        items.id = item.id;
        items.destination = item.destination;
        items.caption = item.caption;
        items.description = item.description;
        items.gallery_id = item.gallery_id;
        items.article_id = item.article_id;
        items.created_at = item.created_at;
        await items.save();
      }
      /** A completion message */
      console.log("x--------- successfully seeded destinations! --------x");
    } catch (error) {
      console.log("x--------- ***failed to seed destinations!*** --------x");
      console.error(error.message);
    }
  }
}

module.exports = DestinationSeeder
