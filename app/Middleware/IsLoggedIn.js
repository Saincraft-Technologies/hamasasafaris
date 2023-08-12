'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsLoggedIn {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, request, response }, next) {
    // call next to advance the request
    try {
      // console.log('Auth =====>>>', auth)
      if (auth.check()) {
        await next()
      };
      
    } catch (error) {
      console.log(error.message);
      auth.logout()
      return response.redirect('/login');
    }
  }
}

module.exports = IsLoggedIn
