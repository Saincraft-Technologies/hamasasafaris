'use strict'
const Booking = use('App/Models/Booking')
class MainController {
    async index({ view }) {
        return 'home';
    }
    async book({ session, request, response }) {
        try {

            let booking = new Booking();
            booking.name = request.input('name');
            booking.email = request.input('email');
            booking.phone = request.input('phone');
            booking.country = request.input('country');
            booking.travelers = request.input('travelers');
            booking.days = request.input('days');

            await booking.save();

            session.flash({ notification: 'Booking successfully!\n\rThank you for choosing Hamasa Safaris! \n\rCheck your email for more information!' });
            return response.redirect('/#bookings');

        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = MainController
