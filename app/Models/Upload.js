'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Upload extends Model {
    gallery() {
        return this.hasMany('App/Models/Gallery')
    }
}

module.exports = Upload
