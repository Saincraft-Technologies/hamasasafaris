'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attraction extends Model {
    gallery() {
        return this.belongsTo('App/Models/Gallery')
    }
    article() {
        return this.belongsTo('App/Models/Article')
    }
    destinations() {
        return this.belongsTo('App/Models/DestinationAttraction')
    }
}

module.exports = Attraction
