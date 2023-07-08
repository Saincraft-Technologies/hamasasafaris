'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Destination extends Model {
    gallery() {
        return this.belongsTo('App/Models/Gallery')
    }
    article() {
        return this.belongsTo('App/Models/Article')
    }
    attractions() {
        return this.manyThrough('App/Models/DestinationAttraction', 'attractions')
    }
    accommodations() {
        return this.manyThrough('App/Models/DestinationAccommodation', 'accommodations')
    }
}

module.exports = Destination
