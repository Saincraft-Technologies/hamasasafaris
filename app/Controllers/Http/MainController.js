'use strict'
const Booking = use('App/Models/Booking')
const Mail = use('Mail')
class MainController {
    async index({ view }) {
        const Destination = use(`App/Models/Destination`);
        const Navigations = use(`App/Models/Navigation`);
        return view.render('site.index', {
            navigations: JSON.parse(JSON.stringify(await Navigations.all())),
            destinations: JSON.parse(JSON.stringify(await Destination.all()))
        });
    }
    async construction({ view }) {
        return view.render('construction', {
        });
    }
    async genesis({ view }) {
        const Destination = use(`App/Models/Destination`);
        const Attraction = use(`App/Models/Attraction`);
        const Activity = use(`App/Models/Activity`);
        const Gallery = use(`App/Models/Gallery`);
        const Upload = use(`App/Models/Upload`);
        const Accommodation = use(`App/Models/Accommodation`);
        const model = await Accommodation.pick(3)
        const destmodel = await Destination.pick(3)
        const models = JSON.parse(JSON.stringify(await model));
        const destmodels = JSON.parse(JSON.stringify(await destmodel));
        const accommodations = [];
        const destinations = [];
        // const accommodation = [];
        // const accommodation = [];
        for (const value of models) {

            if (value['gallery_id']) {
                console.log('value ===>>..', value.gallery_id);
                const gall = await Gallery.find(value.gallery_id);
                value['gallery'] = await gall.toJSON();
                const uploads = await gall.uploads().fetch();
                value['gallery']['uploads'] = JSON.parse(JSON.stringify(await uploads));
                accommodations.push(await value);
            } else {
                accommodations.push(await value);
            }
        }
        for (const value of destmodels) {

            if (value['gallery_id']) {
                console.log('value ===>>..', value.gallery_id);
                const gall = await Gallery.find(value.gallery_id);
                value['gallery'] = await gall.toJSON();
                const uploads = await gall.uploads().fetch();
                value['gallery']['uploads'] = JSON.parse(JSON.stringify(await uploads));
                destinations.push(await value);
            } else {
                destinations.push(await value);
            }
        }
        console.log(accommodations);

        // let destAttr = JSON.parse(JSON.stringify(await DestinAttract.all()));
        // let destAccom = JSON.parse(JSON.stringify(await DestinAccommo.all()));
        // let destination = [];
        // destAttr.map(async (value, key, arrayy) => {
        //     let dest = JSON.parse(JSON.stringify(await Destination.find(value.destination_id)));
        //     dest['attraction'] = JSON.parse(JSON.stringify(await Attraction.find(value.attraction_id)));

        //     destination.push(dest)
        // })
        // destAttr.map(async (value, key, arrayy) => {
        //     let dest = JSON.parse(JSON.stringify(await Destination.find(value.destination_id)));
        //     dest['attraction'] = JSON.parse(JSON.stringify(await Attraction.find(value.attraction_id)));

        //     destination.push(dest)
        // })
        return view.render('site.pages', { accommodations: JSON.parse(JSON.stringify(await accommodations)), destinations: JSON.parse(JSON.stringify(await destinations)), activities: JSON.parse(JSON.stringify(await Activity.all())) });
    }
    async page({ params, request, response, view }) {

        const Destination = use(`App/Models/Destination`);
        const Attraction = use(`App/Models/Attraction`);
        const Activity = use(`App/Models/Activity`);
        const { destination, attraction, activity } = params;
        console.log(destination, attraction, activity)

        if (activity === undefined) {
            if (attraction === undefined) {
                let destin = await Destination.query().where('id', destination).first();
                let attract = await Attraction.all();
                let activ = await Activity.all();
                console.log(destin);
                return view.render('site.destinations.page', { destination: destin, attractions: attract, activities: activ });
            } else {
                let destin = await Destination.query().where('id', destination).first();
                let attract = await Attraction.query().where('id', destination).first();
                let activ = await Activity.all();
                console.log(destin, attract);
                return view.render('site.attractions.page', { destination: destin, attraction: attract, activities: activ });
            }

        } else {

            let destin = await Destination.query().where('id', destination).first();
            let attract = await Attraction.query().where('id', attraction).first();
            let activ = await Activity.query().where('id', activity).first();
            console.log(destin, attract, activ);
            return view.render('site.activities.page', { destination: destin, attractions: attract, activity: activ });
        }

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
