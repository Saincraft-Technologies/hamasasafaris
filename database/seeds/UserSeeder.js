'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const path = require('path');
const fs = require('fs');
class UserSeeder {
  async run() {
    const oldDbUsers = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_db.json/hamasa_db_table_users.json')}`, { encoding: 'utf-8' }));
    console.log(oldDbUsers.data);
    const User = use('App/Models/User')
    for (const item of oldDbUsers.data) {
      const user = new User()
      user.username = item.username;
      user.firstname = item.firstname;
      user.email = item.email;
      user.password = item.password;
      user.address = item.address;
      user.gender = item.gender;
      user.role = item.role;
      user.created_at = item.created_at;
      await user.save();
    }
    console.log("x--------- successfully seeded users! --------x");
  }
}

module.exports = UserSeeder
