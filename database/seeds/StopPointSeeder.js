'use strict'

/*
|--------------------------------------------------------------------------
| StopPointSeeder
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

class StopPointSeeder {
  async run() {

    /** Read data from json file */
    const DBStopPoints = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_db.json/hamasa_db_table_stop_points.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const StopPoint = use('App/Models/StopPoint');
    /** loop through the data */
    for (const item of DBStopPoints.data) {
      /** Insert data one by one!  */
      let items = new StopPoint();
      items.id = item.itemination;
      items.name = item.name;
      items.caption = item.caption;
      items.description = item.description;
      items.gallery_id = item.gallery_id;
      items.created_at = item.created_at;
      await items.save();
    }
    /** A completion message */
    console.log("x--------- successfully seeded stop-points! --------x");
  }
}

module.exports = StopPointSeeder
