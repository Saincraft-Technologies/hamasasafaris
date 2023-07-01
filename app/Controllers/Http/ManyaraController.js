'use strict'

class ManyaraController {
    async index({ view }) {
        return view.render('site.destinations.ngorongoro.index');
    }
}

module.exports = ManyaraController
