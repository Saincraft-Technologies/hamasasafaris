'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
    article() {
        return this.hasMany('App/Models/Article')
    }
    upload() {
        return this.belongsTo('App/Models/Upload')
    }
}

module.exports = Section
