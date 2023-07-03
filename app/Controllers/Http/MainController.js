'use strict'
const Booking = use('App/Models/Booking')
const Mail = use('Mail')
class MainController {
    async index({ view }) {
        return 'home';
    }
    async book({ session, request, response }) {
        try {


            const data = request.only(['email', 'name', 'phone', 'country', 'travelers', 'days'])
            const booking = await Booking.create(data)
            await Mail.send('bookingemail', booking.toJSON(), (message) => {
                message.from('samwel@hamasasafaris.com')
                    .to(booking.email)
                    .subject('Hamasa Safari Booking')
            });
            session.flash({ notification: 'Booking successfully!\n\rThank you for choosing Hamasa Safaris! \n\rCheck your email for more information!' });
            return response.redirect('/#bookings');

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = MainController
