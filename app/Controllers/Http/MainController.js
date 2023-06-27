'use strict'

class MainController {
    async index({view}){
        return view.render('main');
    }
}

module.exports = MainController
