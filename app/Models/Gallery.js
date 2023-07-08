'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gallery extends Model {
    uploads() {
        return this.hasMany('App/Models/Upload')
    }
}

module.exports = Gallery
