'use strict'

/*
|--------------------------------------------------------------------------
| AttractionSeeder
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

class AttractionSeeder {
  async run() {
    const oldDbAttractions = JSON.parse(fs.readFileSync(`${path.resolve('../hamasa_db.json/hamasa_db_table_attractions.json')}`, { encoding: 'utf-8' }));
    console.log(oldDbAttractions.data);
    const Attraction = use('App/Models/Attraction')
    for (const item of oldDbAttractions.data) {
      const attraction = new Attraction()
      attraction.id = item.id;
      attraction.attraction = item.attraction;
      attraction.caption = item.caption;
      attraction.description = item.description;
      attraction.gallery_id = item.gallery_id;
      attraction.created_at = item.created_at;
      await attraction.save();
    }
    console.log("x--------- successfully seeded attractions! --------x");
  }
}
module.exports = AttractionSeeder


