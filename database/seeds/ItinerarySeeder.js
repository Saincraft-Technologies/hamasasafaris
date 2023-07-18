'use strict'

/*
|--------------------------------------------------------------------------
| ItinerarySeeder
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
class ItinerarySeeder {
  async run() {

    /** Read data from json file */
    const DBItineraries = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_db.json/hamasa_db_table_itineraries.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Itinerary = use('App/Models/Itinerary');
    /** loop through the data */
    for (const item of DBItineraries.data) {
      /** Insert data one by one!  */
      let items = new Itinerary();
      items.id = item.id;
      items.from_id = item.from_id;
      items.to_id = item.to_id;
      items.distance = item.distance;
      items.created_at = item.created_at;
      await items.save();
    }
    /** A completion message */
    console.log("x--------- successfully seeded itineraries! --------x");
  }
}

module.exports = ItinerarySeeder
