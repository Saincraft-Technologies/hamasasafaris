'use strict'
const Itineraries = use('App/Models/Itinerary')
class ItineraryController {
    async create({ view }) {
        return view.render('admin.itineraries.create');
    }
    async list({ view }) {
        const itineraries = await Itineraries.all();
        return view.render('admin.itineraries.list', { itineraries: await itineraries.toJSON() });
    }
}

module.exports = ItineraryController
