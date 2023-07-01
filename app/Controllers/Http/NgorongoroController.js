'use strict'

class NgorongoroController {
    async index({ view }) {
        return view.render('site.destinations.ngorongoro.index');
    }
}

module.exports = NgorongoroController
