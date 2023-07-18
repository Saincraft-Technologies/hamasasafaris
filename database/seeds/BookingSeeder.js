'use strict'

/*
|--------------------------------------------------------------------------
| BookingSeeder
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
class BookingSeeder {
  async run() {
    /** Read data from json file */
    const DBBookings = JSON.parse(fs.readFileSync(`${path.resolve('../hamasa_db.json/hamasa_db_table_bookings.json')}`, { encoding: 'utf-8' }));
    /** Load db model */
    const Booking = use('App/Models/Booking');
    /** loop through the data */
    for (const item of DBBookings.data) {
      /** Insert data one by one!  */
      let items = new Booking();
      items.id = item.id;
      items.name = item.name;
      items.email = item.email;
      items.phone = item.phone;
      items.travelers = item.travelers;
      items.days = item.days;
      items.other_requests = item.other_requests;
      items.identifier = item.identifier;
      items.created_at = item.created_at;
      await items.save();
    }
    /** A completion message */
    console.log("x--------- successfully seeded bookings! --------x");
  }
}

module.exports = BookingSeeder
