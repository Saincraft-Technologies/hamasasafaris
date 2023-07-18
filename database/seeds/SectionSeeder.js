'use strict'

/*
|--------------------------------------------------------------------------
| SectionSeeder
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

class SectionSeeder {
  async run() {

    /** Read data from json file */
    const DBSections = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_db.json/hamasa_db_table_sections.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Section = use('App/Models/Section');
    /** loop through the data */
    for (const item of DBSections.data) {
      /** Insert data one by one!  */
      let items = new Section();
      items.id = item.id;
      items.section = item.section;
      items.caption = item.caption;
      items.body = item.body;
      items.link = item.link;
      items.article_id = item.article_id;
      items.upload_id = item.upload_id;
      items.created_at = item.created_at;
      await items.save();
    }
    /** A completion message */
    console.log("x--------- successfully seeded sections! --------x");
  }
}

module.exports = SectionSeeder
