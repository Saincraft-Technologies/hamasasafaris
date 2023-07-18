'use strict'

/*
|--------------------------------------------------------------------------
| NavigationSeeder
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
class NavigationSeeder {
  async run() {

    /** Read data from json file */
    const DBNavigations = JSON.parse(fs.readFileSync(`${path.resolve('../hamasa_db.json/hamasa_db_table_navigations.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Navigation = use('App/Models/Navigation');
    /** loop through the data */
    try {
      for (const item of DBNavigations.data) {
        /** Insert data one by one!  */
        let items = new Navigation();
        items.id = item.id;
        items.display_name = item.display_name;
        items.route = item.route;
        items.parent = item.parent;
        items.icon = item.icon;
        items.oder = item.oder;
        items.created_at = item.created_at;
        await items.save();
      }
      /** A completion message */
      console.log("x--------- successfully seeded navigations! --------x");
    } catch (error) {
      console.log("x--------- failed to seed navigations! --------x");
      console.log(error.message)
    }
  }
}

module.exports = NavigationSeeder
