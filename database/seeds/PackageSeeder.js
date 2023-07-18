'use strict'

/*
|--------------------------------------------------------------------------
| PackageSeeder
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
class PackageSeeder {
  async run() {
    /** Read data from json file */
    const DBPackages = JSON.parse(fs.readFileSync(`${path.resolve('../hamasa_db.json/hamasa_db_table_packages.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Package = use('App/Models/Package');
    /** loop through the data */
    for (const item of DBPackages.data) {
      /** Insert data one by one!  */
      let items = new Package();
      items.id = item.id;
      items.name = item.name;
      items.active = item.active;
      items.description = item.description;
      items.created_at = item.created_at;
      await items.save();
    }
    /** A completion message */
    console.log("x--------- successfully seeded packages! --------x");
  }
}

module.exports = PackageSeeder
