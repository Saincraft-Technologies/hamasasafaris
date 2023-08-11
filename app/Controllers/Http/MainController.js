'use strict'


const Booking = use('App/Models/Booking')
const Mail = use('Mail')
class MainController {
    async index({ view }) {
        const Destination = use(`App/Models/Destination`);
        const Navigations = use(`App/Models/Navigation`);
        return view.render('site.index', {
            navigations: await Navigations.all(),
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
        const Accommodation = use(`App/Models/Accommodation`);

        const Navigation = use(`App/Models/Navigation`);

        const accommodation = await Accommodation.query().with('gallery.uploads').fetch();
        const destination = await Destination.query().with('gallery.uploads').fetch();
        // const attraction = await Attraction.query().with('gallery.uploads').fetch();
        const activity = await Activity.query().with('article.sections').fetch();

        /** Method to fill uploads! */
        // const fillUploads = async (array) => {
        //     const array1 = JSON.parse(JSON.stringify(await array));
        //     const newArray = [];
        //     for (const val of array1) {
        //         const Gallery = use(`App/Models/Gallery`);
        //         const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
        //         val['gallery'] = await gall.toJSON()[0];
        //         console.log('inside', await val);
        //         newArray.push(await val);
        //     }

        //     return await newArray;
        // }

        let accommodations = await accommodation;
        let destinations = await destination;
        // let activities = await fillUploads(activity);
        console.log('genesis ====>>>>', activity.toJSON(), accommodation.toJSON(), destination.toJSON());

        return view.render('site.pages', {
            accommodations: await accommodations.toJSON(),
            destinations: await destinations.toJSON(),
            activities: await activity.toJSON(),
            navigations: await Navigation.all(),
            galleries: await Gallery.query().with('uploads').fetch()
        });
    }
    async destination({ params, request, response, view }) {
        const Navigation = use('App/Models/Navigation')
        const Destination = use(`App/Models/Destination`);
        const Attraction = use(`App/Models/Attraction`);
        
        const fillUploads = async (array) => {
            const array1 = JSON.parse(JSON.stringify(await array));
            const newArray = [];
            for (const val of array1) {
                const Gallery = use(`App/Models/Gallery`);
                const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
                val['gallery'] = await gall.toJSON()[0];
                newArray.push(await val);
            }

            return await newArray;
        }
        const fillGallery = async (array) => {
            const newArray = [];
            for (const val of array) {
                const Gallery = use(`App/Models/Gallery`);
                const gall = await Gallery.query().where('id', val.gallery_id).with('uploads').fetch()
                val['gallery'] = await gall.toJSON()[0];
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
            let destin = await Destination.query().where('id', destination).with('article.sections').with('attractions.gallery.uploads').with('gallery.uploads').fetch();

            /** only destinations queried */
            /** images */

            const destinations = await destin.toJSON();
            const attractions = await destinations[0].attractions;
            console.log('destination ==>>122', await attractions)

            const destinationWithArticle = await destinations;
            return view.render('site.destinations.page', {
                destination: destinationWithArticle[0],
                navigations: JSON.parse(JSON.stringify(await Navigation.all())), attractions: attractions
            });
        } else {
            /** destination and attraction queried */
            console.log('only destination');
            let destin = await Destination.query().where('id', destination).first();
            let attract = await Attraction.query().where('id', attraction).first();
            console.log(destin, attract);
            return view.render('site.attractions.page', {
                destination: destin,
                navigations: JSON.parse(JSON.stringify(await Navigation.all())), attraction: attract
            });
        }

    }
    async packages({ params, view, response }) {
        const Navigation = use('App/Models/Navigation');
        const Package = use('App/Models/Package');
        const Itinerary = use('App/Models/Itinerary');
        const PackageItinerary = use('App/Models/PackageItinerary');
        const packages = await Package.query().with('itineraries').fetch();
        // console.log('log ====>>', packageItineraries.toJSON())
        const final = [];
        for (let packagee of packages.toJSON()) {
            let iitem = [];
            for (let itinerary of packagee.itineraries) {
                const packageItineraries = await PackageItinerary.query().where('itinerary_id', itinerary.id).fetch();
                const data = await Itinerary.query().where('id', itinerary.id).with('fromPoint').with('toPoint').fetch();
                const ans = data.toJSON();
                ans[0]['day'] = await packageItineraries.toJSON()[0].day;
                iitem.push(ans[0]);
            }
            packagee['itineraries'] = iitem;
            console.log(packagee);
            final.push(packagee);
        }
        return view.render('site.packages.pages', {
            packages: final,
            navigations: JSON.parse(JSON.stringify(await Navigation.all()))
        });
    }

    async about({ view }) {
        const Navigation = use('App/Models/Navigation');
        return view.render('site.abouts.page', {
            navigations: JSON.parse(JSON.stringify(await Navigation.all()))
        });
    }

    async questions({ view }) {
        const Navigation = use('App/Models/Navigation');
        return view.render('site.faqs.page', {
            navigations: JSON.parse(JSON.stringify(await Navigation.all()))
        });
    }
    async package({ params, view, response }) {
        const Navigation = use('App/Models/Navigation');
        const Package = use('App/Models/Package');
        const Itinerary = use('App/Models/Itinerary');
        const PackageItinerary = use('App/Models/PackageItinerary');
        const { ppackage, stoppoint, activity } = params;
        const packages = await Package.query().where('id', ppackage).with('itineraries').fetch();
        // console.log('log ====>>', packageItineraries.toJSON())
        const final = [];
        if (stoppoint === undefined) {
            for (let packagee of packages.toJSON()) {
                let iitem = [];
                for (let itinerary of packagee.itineraries) {
                    const packageItineraries = await PackageItinerary.query().where('itinerary_id', itinerary.id).fetch();
                    const data = await Itinerary.query().where('id', itinerary.id).with('fromPoint').with('toPoint').fetch();
                    const ans = data.toJSON();
                    ans[0]['day'] = await packageItineraries.toJSON()[0].day;
                    iitem.push(ans[0]);
                }
                packagee['itineraries'] = iitem;
                final.push(packagee);
            }
            console.log('final =====>>>>', final);
            return view.render('site.packages.page', {
                package: final[0],
                navigations: JSON.parse(JSON.stringify(await Navigation.all()))
            });
        } else {
            if (activity === undefined) {
                const StopPoint = use('App/Models/StopPoint');
                const stoppointt = await StopPoint.query().where('id', stoppoint).with('activities.article.sections').fetch();
                console.log('stop point init =====>>>>', stoppointt.toJSON()[0].activities);
                return view.render('site.activities.package', {
                    package: packages.toJSON()[0],
                    stoppoint: await stoppointt.toJSON()[0],
                    navigations: JSON.parse(JSON.stringify(await Navigation.all()))
                });
            } else {
                for (let packagee of packages.toJSON()) {
                    let iitem = [];
                    for (let itinerary of packagee.itineraries) {
                        const packageItineraries = await PackageItinerary.query().where('itinerary_id', itinerary.id).fetch();
                        const stopPointActivities = await StopPointActivity.query().where('activity_id', activity).where('stop_point_id', stoppoint).with('activity').with('stopPoint').fetch();
                        const ans = stopPointActivities.toJSON();
                        console.log('activity ===>>', ans);
                        iitem.push(ans);
                    }
                    packagee['itineraries'] = iitem;
                    final.push(packagee);
                }
                console.log('final =====>>>>', final);

                return view.render('site.packages.page', {
                    package: final[0],
                    navigations: JSON.parse(JSON.stringify(await Navigation.all()))
                });
            }
        }
    }

    async attraction({ params, request, response, view }) {

        const Navigation = use(`App/Models/Navigation`);
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
            return view.render('site.attractions.page', {
                navigations: JSON.parse(JSON.stringify(await Navigation.all())), attraction: attractionWithArticle[0]
            });
        }

        let attract = await Attraction.query().with('gallery').fetch();
        const attractions = await fillUploads(attract.toJSON())
        console.log('attractions===>>', attractions);
        return view.render('site.attractions.pages', {
            navigations: JSON.parse(JSON.stringify(await Navigation.all())), attractions: attractions
        });
        /** only destinations queried */
        /** images */


    }
    async activity({ params, request, response, view }) {

        const Navigation = use(`App/Models/Navigation`);
        const Activity = use(`App/Models/Activity`);
        const Attraction = use(`App/Models/Attraction`);

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
            let active = await Activity.query().where('id', activity).with('article').fetch();

            /** only destinations queried */
            /** images */
            const activities = await fillArticleContent(active.toJSON())
            console.log('activities ===>>', activities);
            return view.render('site.activities.page', {
                navigations: JSON.parse(JSON.stringify(await Navigation.all())), activity: activities[0]
            });
        } else {
            /** destination and attraction queried */
            console.log('only destination');
            let active = await Activity.query().with('article').fetch();
            const activities = await fillArticleContent(active.toJSON())
            return view.render('site.activities.page', {
                navigations: JSON.parse(JSON.stringify(await Navigation.all())), activities: activities
            });
        }

    }
    async accommodation({ params, request, response, view }) {

        const Navigation = use(`App/Models/Navigation`);
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
            return view.render('site.accommodations.page', {
                navigations: JSON.parse(JSON.stringify(await Navigation.all())), accommodation: accommodations[0], facilities: facilities
            });
        } else {
            /** accommodation and facility queried */
            console.log('only accommodation');
            let accommodat = await Accommodation.query().with('facilities').with('gallery').fetch();
            const accommodations = await fillUploads(accommodat.toJSON())
            console.log(accommodat.toJSON());
            return view.render('site.accommodations.pages', {
                navigations: JSON.parse(JSON.stringify(await Navigation.all())), accommodations: accommodations
            });
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
