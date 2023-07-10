'use strict'


const Booking = use('App/Models/Booking')
const Mail = use('Mail')
class MainController {
    async index({ view }) {
        const Destination = use(`App/Models/Destination`);
        const Navigations = use(`App/Models/Navigation`);
        const Gallery = use(`App/Models/Gallery`);
        return view.render('site.index', {
            navigations: JSON.parse(JSON.stringify(await Navigations.all())),
            destinations: JSON.parse(JSON.stringify(await Destination.all())),
            galleries: []
        });
    }
    async construction({ view }) {
        return view.render('construction', {
        });
    }
    async genesis({ view }) {
        /** need refurbrishemtn ASAP ------ Here G here  */
        const Destination = use(`App/Models/Destination`);
        const Attraction = use(`App/Models/Attraction`);
        const Activity = use(`App/Models/Activity`);
        const Gallery = use(`App/Models/Gallery`);
        const Navigation = use(`App/Models/Navigation`);
        const Accommodation = use(`App/Models/Accommodation`);
        const accommodation = await Accommodation.query().with('gallery').fetch();
        const destination = await Destination.query().with('gallery').fetch();
        const attraction = await Attraction.query().with('gallery').fetch();
        const activity = await Activity.query().with('gallery').fetch();

        /** Method to fill uploads! */
        const fillUploads = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Gallery = use(`App/Models/Gallery`);
                const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
                val['gallery'] = await gall.toJSON()[0];
                console.log('inside', await val);
                newArray.push(await val);
            }

            return await newArray;
        }
        let accommodations = await fillUploads(accommodation);
        let destinations = await fillUploads(destination);
        let activities = await fillUploads(activity);
        // console.log('accommodation', k);

        return view.render('site.pages', {
            accommodations: JSON.parse(JSON.stringify(await accommodations)),
            destinations: JSON.parse(JSON.stringify(await destinations)),
            activities: JSON.parse(JSON.stringify(await activities)),
            navigations: JSON.parse(JSON.stringify(await Navigation.all())),
            galleries: JSON.parse(JSON.stringify(await Gallery.query().with('uploads').fetch()))
        });
    }
    async destination({ params, request, response, view }) {

        const Destination = use(`App/Models/Destination`);
        const Attraction = use(`App/Models/Attraction`);
        const fillUploads = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Gallery = use(`App/Models/Gallery`);
                const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
                val['gallery'] = await gall.toJSON()[0];
                console.log('inside', await val);
                newArray.push(await val);
            }

            return await newArray;
        }

        const fillArticleContent = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Section = use(`App/Models/Section`);
                if (val.article_id) {
                    const sec = await Section.query().where('article_id', val.article_id).with('upload').fetch()
                    console.log('article inside ===>>>>', await val);
                    val['article']['sections'] = await sec.toJSON();
                    newArray.push(await val);
                } else {
                    val['article'] = null;
                    newArray.push(await val);
                }
            }


            return await newArray;
        }
        const { destination, attraction, activity } = params;
        if (destination) {
            /** only destinations queried */
            let destin = await Destination.query().where('id', destination).with('article').with('attractions').with('gallery').fetch();

            /** only destinations queried */
            /** images */
            const destinations = await fillUploads(destin.toJSON())
            console.log('destiny ===>>', destinations);
            const attractions = await fillUploads(destinations[0].attractions)

            const destinationWithArticle = await fillArticleContent(destinations)
            console.log('destinations===>>', destinationWithArticle);
            return view.render('site.destinations.page', { destination: destinationWithArticle[0], attractions: attractions });
        } else {
            /** destination and attraction queried */
            console.log('only destination');
            let destin = await Destination.query().where('id', destination).first();
            let attract = await Attraction.query().where('id', attraction).first();
            console.log(destin, attract);
            return view.render('site.attractions.page', { destination: destin, attraction: attract });
        }

    }

    async attraction({ params, request, response, view }) {

        const Attraction = use(`App/Models/Attraction`);
        const fillUploads = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Gallery = use(`App/Models/Gallery`);
                const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
                val['gallery'] = await gall.toJSON()[0];
                console.log('inside', await val);
                newArray.push(await val);
            }


            return await newArray;
        }
        const fillArticleContent = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Section = use(`App/Models/Section`);
                if (val.article_id) {
                    const sec = await Section.query().where('article_id', val.article_id).with('upload').fetch()
                    console.log('article inside ===>>>>', await val);
                    val['article']['sections'] = await sec.toJSON();
                    newArray.push(await val);
                } else {
                    val['article'] = null;
                    newArray.push(await val);
                }
            }


            return await newArray;
        }

        const { destination, attraction, activity } = params;
        /** only destinations queried */
        if (attraction) {
            let attract = await Attraction.query().where('id', attraction).with('article').with('gallery').fetch();
            const attractions = await fillUploads(attract.toJSON())
            const attractionWithArticle = await fillArticleContent(attractions)
            console.log('attractions===>>', attractionWithArticle);
            return view.render('site.attractions.page', { attraction: attractionWithArticle[0] });
        }

        let attract = await Attraction.query().with('gallery').fetch();
        const attractions = await fillUploads(attract.toJSON())
        console.log('attractions===>>', attractions);
        return view.render('site.attractions.pages', { attractions: attractions });
        /** only destinations queried */
        /** images */


    }
    async activity({ params, request, response, view }) {

        const Activity = use(`App/Models/Activity`);
        const Attraction = use(`App/Models/Attraction`);
        const fillUploads = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Gallery = use(`App/Models/Gallery`);
                const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
                val['gallery'] = await gall.toJSON()[0];
                console.log('inside', await val);
                newArray.push(await val);
            }

            return await newArray;
        }

        const fillArticleContent = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Section = use(`App/Models/Section`);
                if (val.article_id) {
                    const sec = await Section.query().where('article_id', val.article_id).with('upload').fetch()
                    console.log('article inside ===>>>>', await val);
                    val['article']['sections'] = await sec.toJSON();
                    newArray.push(await val);
                } else {
                    val['article'] = null;
                    newArray.push(await val);
                }
            }


            return await newArray;
        }
        const { destination, attraction, activity } = params;
        if (activity) {
            /** only activity queried */
            let active = await Activity.query().where('id', activity).with('article').with('gallery').fetch();

            /** only destinations queried */
            /** images */
            const activit = await fillUploads(active.toJSON())
            const activities = await fillArticleContent(activit)
            console.log('activities ===>>', activities);
            return view.render('site.activities.page', { activity: activities[0] });
        } else {
            /** destination and attraction queried */
            console.log('only destination');
            let active = await Activity.query().with('gallery').with('article').fetch();
            const activit = await fillUploads(active.toJSON())
            const activities = await fillArticleContent(activit)
            console.log(destin, attract);
            return view.render('site.activities.page', { activities: activities });
        }

    }
    async accommodation({ params, request, response, view }) {

        const Accommodation = use(`App/Models/Accommodation`);
        const fillUploads = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Gallery = use(`App/Models/Gallery`);
                const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
                val['gallery'] = await gall.toJSON()[0];
                console.log('inside', await val);
                newArray.push(await val);
            }

            return await newArray;
        }
        const { accommodation, facility, activity } = params;
        if (accommodation) {
            /** only destinations queried */
            let accommodat = await Accommodation.query().where('id', accommodation).with('facilities').with('gallery').fetch();
            /** facilitys */
            /** images */
            const accommodations = await fillUploads(accommodat.toJSON())

            const facilities = await fillUploads(accommodations[0].facilities)

            console.log(accommodations);
            return view.render('site.accommodations.page', { accommodation: accommodations[0], facilities: facilities });
        } else {
            /** accommodation and facility queried */
            console.log('only accommodation');
            let accommodat = await Accommodation.query().with('facilities').with('gallery').fetch();
            const accommodations = await fillUploads(accommodat.toJSON())
            console.log(accommodat.toJSON());
            return view.render('site.accommodations.pages', { accommodations: accommodations });
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
