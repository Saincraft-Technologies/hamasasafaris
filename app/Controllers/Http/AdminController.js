'use strict'
const Booking = use('App/Models/Booking');
class AdminController {
    async index({ auth, view }) {
        try {
            const loggedInUser = auth.check();
            console.log(loggedInUser);
            return await view.render(`admin.dashboard`, { bookings: await bookings.toJSON(), loggedInUser: loggedInUser });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AdminController
