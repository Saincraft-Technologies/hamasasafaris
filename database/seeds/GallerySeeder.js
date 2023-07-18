'use strict'

/*
|--------------------------------------------------------------------------
| GallerySeeder
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
class GallerySeeder {
  async run() {

    const oldDbGalleries = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_backup/hamasa_db_table_galleries.json')}`, { encoding: 'utf-8' }));
    console.log(oldDbGalleries.data);
    const Gallery = use('App/Models/Gallery')
    try {
      for (const item of oldDbGalleries.data) {
        const gallery = new Gallery()
        gallery.id = item.id;
        gallery.gallery = item.gallery;
        gallery.created_at = item.created_at;
        await gallery.save();
      }
      console.log("x--------- successfully seeded galleries! --------x");
    } catch (error) {
      console.error("x--------- failed to seed galleries! --------x");
      console.log(error.message);
    }
  }
}

module.exports = GallerySeeder
