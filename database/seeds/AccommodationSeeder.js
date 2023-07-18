'use strict'

/*
|--------------------------------------------------------------------------
| AccommodationSeeder
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
class AccommodationSeeder {
  async run() {
    try {
      const oldDbAccommodations = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_backup/hamasa_db_table_accommodations.json')}`, { encoding: 'utf-8' }));
      console.log(oldDbAccommodations.data);
      const Accommodation = use('App/Models/Accommodation')
      for (const item of oldDbAccommodations.data) {
        const accommodation = new Accommodation()
        accommodation.id = item.id;
        accommodation.accommodation = item.accommodation;
        accommodation.caption = item.caption;
        accommodation.description = item.description;
        accommodation.type = item.type;
        accommodation.address = item.gender;
        accommodation.phone = item.phone;
        accommodation.created_at = item.created_at;
        await accommodation.save();
      }
      console.log("x--------- successfully seeded accommodations! --------x");
    } catch (error) {
      console.error("x--------- **failed to seed accommodations!** --------x");
      console.error(error.message);

    }
  }
}

module.exports = AccommodationSeeder
