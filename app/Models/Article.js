'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {
    sections() {
        return this.hasMany('App/Models/Section')
    }
}

module.exports = Article
