'use strict'

/*
|--------------------------------------------------------------------------
| FacilitySeeder
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
class FacilitySeeder {
  async run() {
    /** Read data from json file */
    const DBFacilities = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_backup/hamasa_db_table_facilities.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Facility = use('App/Models/Facility');
    /** loop through the data */
    for (const item of DBFacilities.data) {
      /** Insert data one by one!  */
      let items = new Facility();
      items.id = item.id;
      items.facility = item.facility;
      items.caption = item.caption;
      items.services = item.services;
      items.created_at = item.created_at;
      await items.save();
    }
    /** A completion message */
    console.log("x--------- successfully seeded facilities! --------x");
  }
}

module.exports = FacilitySeeder
