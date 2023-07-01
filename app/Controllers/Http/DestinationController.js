'use strict'

const Destinations = use('App/Models/Destination')
class DestinationController {
    async create({ view }) {
        return view.render('admin.destinations.create');
    }
    async list({ view }) {
        const destinations = await Destinations.all();
        return view.render('admin.destinations.list', { destinations: await destinations.toJSON() });
    }
}

module.exports = DestinationController
