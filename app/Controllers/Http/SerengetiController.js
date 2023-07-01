'use strict'

class SerengetiController {

    async index({ view }) {
        return view.render('site.destinations.serengeti.index');
    }
}

module.exports = SerengetiController
