'use strict'

class PagesController {
    async index({ params, request, response, view }) {
        console.log(params);
        // const model = use(`App/Models/${params.modal}`);
        // let modal = await model.all();
        return view.render(`site.destinations.${params.modal}.index`);
    }
}

module.exports = PagesController
