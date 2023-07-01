'use strict'
const Booking = use('App/Models/Booking');
class AdminController {
    async index({ view }) {
        try {
            const bookings = await Booking.all();
            console.log(await bookings.toJSON());
            
            return await view.render(`admin.dashboard`, { bookings: await bookings.toJSON() });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AdminController
