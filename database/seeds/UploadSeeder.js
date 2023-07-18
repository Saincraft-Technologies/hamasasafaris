'use strict'

/*
|--------------------------------------------------------------------------
| UploadSeeder
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
class UploadSeeder {
  async run() {

    const oldDbUploads = JSON.parse(fs.readFileSync(`${path.resolve('../hamasa_db.json/hamasa_db_table_uploads.json')}`, { encoding: 'utf-8' }));
    console.log(oldDbUploads.data);
    const Upload = use('App/Models/Upload')
    for (const item of oldDbUploads.data) {
      const upload = new Upload()
      upload.filepath = item.filepath;
      upload.metadata = item.metadata;
      upload.caption = item.caption;
      upload.filename = item.filename;
      upload.gallery_id = item.gallery_id;
      upload.created_at = item.created_at;
      await upload.save();
    }
    console.log("x--------- successfully seeded uploads! --------x");
  }
}

module.exports = UploadSeeder
