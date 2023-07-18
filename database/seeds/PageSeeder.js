'use strict'

/*
|--------------------------------------------------------------------------
| PageSeeder
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

class PageSeeder {
  async run() {

    /** Read data from json file */
    const DBPages = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_backup/hamasa_db_table_pages.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Page = use('App/Models/Page');
    /** loop through the data */
    for (const item of DBPages.data) {
      /** Insert data one by one!  */
      let items = new Page();
      items.id = item.id;
      items.page = item.page;
      items.route = item.route;
      items.title = item.title;
      items.status = item.status;
      items.created_at = item.created_at;
      await itemss.save();
    }
    /** A completion message */
    console.log("x--------- successfully seeded pages! --------x");
  }
}

module.exports = PageSeeder
