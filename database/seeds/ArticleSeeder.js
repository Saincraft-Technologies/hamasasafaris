'use strict'

/*
|--------------------------------------------------------------------------
| ArticleSeeder
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

class ArticleSeeder {
  async run() {

    const oldDbArticles = JSON.parse(fs.readFileSync(`${path.resolve('./database/hamasa_backup/hamasa_db_table_articles.json')}`, { encoding: 'utf-8' }));
    console.log(oldDbArticles.data);
    const Article = use('App/Models/Article')
    for (const item of oldDbArticles.data) {
      const article = new Article()
      article.id = item.id;
      article.title = item.title;
      article.source = item.source;
      article.author = item.author;
      article.visible = item.visible;
      article.created_at = item.created_at;
      await article.save();
      console.log("seed article", article);
    }
    console.log("x--------- successfully seeded articles! --------x");
  }
}

module.exports = ArticleSeeder
