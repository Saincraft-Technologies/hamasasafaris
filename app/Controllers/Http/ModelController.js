'use strict'

const capitalize = s => s.replace(/./, c => c.toUpperCase());
class ModelController {
    async index({ auth, params, view }) {
        try {
            // console.log(await auth.getUser());
            let t = capitalize(params.model);
            // console.log(params);

            let createRoute = `/admin/create/${params.model}`;
            let listRoute = `/admin/list/${params.model}`;
            let mod = params.model;
            return await view.render(`admin.items.index`, { loggedInUser: await auth.getUser(), createRoute: createRoute, listRoute: listRoute, model: mod });
        } catch (error) {
            console.log(error);
        }
    }
    async list({ params, view }) {
        try {
            let t = capitalize(params.model);
            // console.log(t);

            const Modal = use(`App/Models/${t}`);
            var model;
            let editRoute = `/admin/edit/${params.model}`;
            let delRoute = `/admin/delete/${params.model}`;
            let uploadRoute = `/admin/upload/${params.model}`;
            let addActivityRoute = `/admin/activity/${params.model}`;
            switch (t) {
                case 'StopPoint':
                    const stopPoint = await Modal.query().with('gallery').fetch();
                    return await view.render(`admin.${params.model}.list`, { items: stopPoint.toJSON(), model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute, addActivityRoute: addActivityRoute });
                    break;
                case 'Itinerary':
                    const PackageModel = use(`App/Models/Package${t}`);
                    const packItin = await PackageModel.query().with('package').with('itinerary').fetch();
                    const items = packItin.toJSON()
                    const final = [];
                    for (const item of items) {
                        const itt = await Modal.query().where('id', item.itinerary.id).with('fromPoint').with('toPoint').fetch();
                        item['itinerary'] = itt.toJSON()[0];
                        final.push(item);
                    }
                    console.log('itineraries ===>>>', await final);

                    return await view.render(`admin.${params.model}.list`, { items: final, model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });
                    break;
                case 'Activity':
                    model = await Modal.query().with('article').fetch();
                    return await view.render(`admin.${params.model}.list`, { items: model.toJSON(), model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });
                    break;

                case 'Charge':
                    model = await Modal.query().with('itinerary').fetch();
                    return await view.render(`admin.${params.model}.list`, { items: model.toJSON(), model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });
                    break;

                default:

                    try {
                        model = await Modal.query().with('gallery').fetch();
                    } catch (error) {
                        model = await Modal.query().fetch();
                    }
                    return await view.render(`admin.${params.model}.list`, { items: model.toJSON(), model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });
                    break;
            }

        } catch (error) {
            console.log(error);
        }
    }
    async create({ params, view }) {
        try {
            let t = capitalize(params.model);
            console.log(t);

            const Modal = use(`App/Models/${t}`);
            let model = await Modal.all();
            // console.log('list invoked!', model);
            let action = `/admin/store/${params.model}`
            return await view.render(`admin.${params.model}.create`, { [`${params.model}`]: model, action: action });
        } catch (error) {
            console.log(error);
        }
    }

    async selector({ params, view }) {
        try {
            let t = capitalize(params.model);
            console.log(t);
            const Modal = use(`App/Models/${t}`);
            switch (params.model) {
                case 'destination':
                    const model = await Modal.all();
                    console.log('list invoked!', model.toJSON());
                    return await view.render(`admin.selector.destination`, { items: model.toJSON(), model: params.model });
                    break;
                case 'attraction':
                    const Dest = use(`App/Models/Destination`);
                    console.log('params ====>>>>', params)
                    const dest = await Dest.query().where('id', params.id).with('attractions').fetch();

                    console.log('====>>>', params, await dest.toJSON()[0]);
                    return await view.render(`admin.selector.attraction`, { items: dest.toJSON()[0]['attractions'], model: params.model });
                    break;
                case 'stopPoint':
                    const stopPointModel = await Modal.all();
                    console.log('list invoked!', stopPointModel.toJSON());
                    return await view.render(`admin.selector.stopPoint`, { items: stopPointModel.toJSON(), model: params.model });
                    break;
                case 'activity':
                    const activity = await Modal.all();
                    console.log('list invoked!', activity.toJSON());
                    return await view.render(`admin.selector.activity`, { items: activity.toJSON(), model: params.model });
                    break;

                case 'package':
                    const packageModel = await Modal.all();
                    console.log('list invoked!', packageModel.toJSON());
                    return await view.render(`admin.selector.package`, { items: packageModel.toJSON(), model: params.model });
                    break;

                default:
                    const modelMain = await Modal.all();
                    console.log('list invoked!', modelMain.toJSON());
                    return await view.render(`admin.selector.selector`, { items: modelMain.toJSON(), model: params.model });
            }
        } catch (error) {
            console.log(error);
        }
    }
    async edit({ params, view }) {
        try {
            let t = capitalize(params.model);
            console.log('params', params);

            const Modal = use(`App/Models/${t}`);
            let model = await Modal.find(params.id);
            console.log('model ====>>>', await model.toJSON());
            let action = `/admin/update/${params.model}/${params.id}`
            return await view.render(`admin.${params.model}.create`, { item: model.toJSON(), action: action });
        } catch (error) {
            console.log(error);
        }
    }
    async upload({ params, view }) {
        try {
            let t = capitalize(params.model);
            console.log('params', params);

            const Modal = use(`App/Models/${t}`);
            let model = JSON.parse(JSON.stringify(await Modal.find(params.id)));
            let action = `/upload/${params.model}/${params.id}`
            return await view.render(`admin.${params.model}.upload`, { [`${params.model}`]: model, action: action });
        } catch (error) {
            console.log(error);
        } process
    }

    async store({ auth, params, request, response, view }) {
        try {
            let t = capitalize(params.model);
            console.log(t);

            const Modal = use(`App/Models/${t}`);
            const Gallery = use(`App/Models/Gallery`);
            const Article = use(`App/Models/Article`);
            const newModal = new Modal();
            const object = request.body;

            const gal = new Gallery();
            switch (params.model) {
                case 'gallery':

                    gal.gallery = request.input(`${params.model}`);
                    newModal.gallery_id = await gal.toJSON().id;
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;

                case 'accommodation':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    gal.gallery = request.input(`${params.model}`);
                    await gal.save();
                    newModal.gallery_id = await gal.toJSON().id;
                    console.log('gallery ====>>>>', await gal.toJSON());
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;

                case 'destination':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    gal.gallery = request.input(`${params.model}`);
                    await gal.save();
                    newModal.gallery_id = await gal.toJSON().id;
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;
                case 'activity':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    const article = new Article();
                    article.title = request.input(`${params.model}`);
                    article.source = 'in-house';
                    article.author = 'Hamasa safaris';
                    article.visible = true;
                    await article.save();

                    newModal.article_id = await article.toJSON().id;
                    await newModal.save();
                    const DestAct = use('App/Models/DestinationAttraction');
                    DestAct.destination_id = request.input('destinationId');
                    DestAct.attraction_id = newModal.toJSON().id;
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;

                case 'package':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    // gal.gallery = request.input(`${params.model}`);
                    // await gal.save();
                    // newModal.gallery_id = await gal.toJSON().id;
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;

                case 'charge':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;
                case 'attraction':
                    for (const key in object) {
                        if (key !== '_csrf' && key !== 'destinationId') {
                            newModal[key] = object[key];
                        }
                    }
                    gal.gallery = request.input(`${params.model}`);
                    await gal.save();
                    newModal.gallery_id = await gal.toJSON().id;
                    await newModal.save();
                    const DestAction = use('App/Models/DestinationAttraction');
                    const destAct = new DestAction();
                    destAct.destination_id = request.input('destinationId');
                    destAct.attraction_id = newModal.toJSON().id;
                    await destAct.save()
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;

                case 'itinerary':
                    for (const key in object) {
                        if (key !== '_csrf' && key !== 'day' && key !== 'packageId') {
                            newModal[key] = object[key];
                        }
                    }
                    await newModal.save();
                    const PackItin = use('App/Models/PackageItinerary');
                    const packItin = new PackItin();
                    packItin.day = request.input('day');
                    packItin.package_id = request.input('packageId');
                    packItin.itinerary_id = newModal.toJSON().id;
                    packItin.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;
                case 'stopPoint':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    console.log('======>>', await request)
                    gal.gallery = request.input(`name`);
                    await gal.save();
                    newModal.gallery_id = await gal.toJSON().id;
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;

                default:

                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;
            }


        } catch (error) {
            console.log(error);
            return response.status(500).json({ status: false, notification: 'failed to add ' + params.model });
        }
    }
    async addStopPointActivity({ params, request, view }) {
        const { id, model } = params;
        try {
            // const Activity = use(`App/Models/Activity`);
            // const activities = await Activity.all();
            const action = `/admin/activity/${model}/${id}`;
            return await view.render(`admin.${model}.addActivity`, { action: action });
        } catch (error) {
            console.log(error);
        }
    }
    async stopPoint({ params, view }) {
        const { id, model } = params;
        try {
            const StopPoint = use(`App/Models/StopPoint`);
            const stopPoint = await StopPoint.query().where('id', id).with(`${model}`).fetch();
            console.log(await stopPoint.toJSON()[0]);
            return await view.render(`admin.stopPoint.profile`, { stopPoint: await stopPoint.toJSON()[0] })
        } catch (error) {
            console.log(error);
        }
    }
    async storeStopPointActivity({ params, request, response }) {
        const { id, model } = params;
        try {
            const ModelActivity = use(`App/Models/${capitalize(model)}Activity`);
            const modelActivity = new ModelActivity();
            modelActivity.activity_id = request.input('activityId');
            modelActivity.stop_point_id = id;
            modelActivity.save();
            return response.json({ status: true, notification: 'successfully added ' + model + ' activity' })
        } catch (error) {
            console.log(error);
            return response.json({ status: false, notification: 'failed to add ' + model + ' activity' })
        }
    }
    async update({ auth, params, request, response, view }) {
        try {
            console.log('=========== UPDATE ==========');
            let t = capitalize(params.model);
            console.log(params.model);
            let id = params.id;

            const Modal = use(`App/Models/${t}`);
            const Gallery = use(`App/Models/Gallery`);
            let newModal = await Modal.findOrFail(id);
            const object = request.body;
            console.log('Model ====>>>1', object);
            var gal;
            if (newModal.gallery_id) {
                gal = await Gallery.findOrFail(newModal.gallery_id);
            }
            switch (params.model) {
                case 'gallery':

                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully updated ' + params.model });
                    break;

                case 'accommodation':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                        console.log('Model ====>>>', newModal[key]);
                    }
                    gal.gallery = request.input(`${params.model}`);
                    gal.save();

                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully updated ' + params.model });
                    break;

                case 'destination':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully updated ' + params.model });
                    break;

                case 'attraction':
                    for (const key in object) {
                        if (key !== '_csrf' && key !== 'destinationId') {
                            newModal[key] = object[key];
                        }
                    }
                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    await newModal.save();
                    const DestAct = use('App/Models/DestinationAttraction');
                    const destAct = await DestAct.find('attraction_id', newModal.id);
                    destAct.destination_id = request.input('destinationId');
                    destAct.attraction_id = newModal.toJSON().id;
                    await destAct.save()
                    return response.json({ status: true, notification: 'successfully updated ' + params.model });
                    break;
                case 'activity':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    newModal.article_id = await article.toJSON().id;
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully saved ' + params.model });
                    break;

                case 'stopPoint':
                    for (const key in object) {
                        if (key !== '_csrf') {
                            console.log(key, '======>>', object[key])
                            newModal[key] = object[key];
                        }
                    }
                    console.log('======>>', await newModal)
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully updated ' + params.model });
                    break;
                default:
                    for (const key in object) {
                        if (key !== '_csrf') {
                            newModal[key] = object[key];
                        }
                    }
                    await newModal.save();
                    return response.json({ status: true, notification: 'successfully updated ' + params.model });
                    break;
            }


        } catch (error) {
            console.log(error);
            return response.status(500).json({ status: false, notification: 'failed to update ' + params.model });
        }
    }

    async gallery({ params, view }) {
        try {
            const { id, model } = params;
            const Gallery = use('App/Models/Gallery');
            const Upload = use('App/Models/Upload');
            const gallery = await Gallery.query().where('id', id).fetch()
            const uploads = await Upload.query().where('gallery_id', id).fetch()
            console.log("uploads ===>>>1", JSON.parse(JSON.stringify(gallery)), params.model);

            let editRoute = `/ upload / ${model} / ${id}`;
            let delRoute = `/ upload / ${model} / ${id}`;
            let uploadRoute = `/ admin / upload / ${model}`;
            const modelValue = JSON.parse(JSON.stringify(await gallery))
            return await view.render(`admin.${model}.gallery`, { items: JSON.parse(JSON.stringify(uploads)), modelValue: modelValue[0]['gallery'], model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });

        } catch (error) {
            console.log(error);

        }
    }

    async viewupload({ params, request, response, view }) {
        try {
            const { model, id, fileId } = params;
            let t = capitalize(model);
            const Modal = use(`App/Models/${t}`);
            const Upload = use(`App/Models/Upload`);
            /** prepare the file and modal view params */
            let modal = await Modal.query().where('id', id).fetch();
            const fileToView = await Upload.query().where('id', fileId).fetch();
            console.log('list invoked!', fileToView.toJSON()[0]);
            let action = `/ uploads / ${model} / ${params.id} / ${fileToView.toJSON()[0].id}`
            return await view.render(`admin.${model}.upload`, { model: model, file: fileToView.toJSON()[0], action: action });

        } catch (error) {
            console.log(error);
        }
    }
    async saveupload({ auth, params, request, response, view }) {

        try {
            let t = capitalize(params.model);
            const Drive = use('Drive');
            const Upload = use(`App/Models/Upload`);
            const { v4 } = require('uuid');
            const name = v4();
            var extname;
            var type;
            var subtype;
            var filepath;
            var caption = request.input('caption');
            // Uploads the file to Amazon S3 and stores the url
            request.multipart.file('pic_image', {
                types: ['image'],
                size: '2mb'
            }, async (file) => {

                type = file.type;
                subtype = file.subtype;
                extname = file.extname;
                const s3Path = `hamasasafaris / uploads / ${name}.${extname}`
                filepath = await Drive.disk('s3').put(s3Path, file.stream, { ACL: 'public-read', ContentType: `${type} / ${subtype}` });
                // console.log('answer ====>>> ', ans);

            });

            let processedData = await request.multipart.process()
            console.log('processed data ====>>>>', await processedData);
            const imageModal = new Upload();
            imageModal.gallery_id = params.id;
            imageModal.filepath = filepath;
            imageModal.metadata = subtype;
            imageModal.caption = caption;
            imageModal.filename = `${name}.${extname}`;
            await imageModal.save();
            console.log('saved here!! ====>>>>');
            return response.json({ status: true, notification: 'successfully uploaded file ' });

        } catch (error) {
            console.log(error);
            return response.status(500).json({ status: false, notification: 'failed to add ' + params.model });
        }
    }
    async deleteupload({ params, request, response, view }) {
        try {
            let t = capitalize(params.model);
            const Drive = use('Drive');
            const Modal = use(`App/Models/${t}`);
            const Upload = use(`App/Models/Upload`);

            const fileToDelete = await Upload.query().where('id', params.fileId).fetch();
            await Drive.disk('s3').delete(fileToDelete.toJSON().filepath);
            return await fileToDelete.delete();
        } catch (error) {
            console.log(error);
        }
    }

    async updateupload({ params, request, response, view }) {

        try {
            const Drive = use('Drive');
            const Upload = use(`App/Models/Upload`);
            const fileToUpdate = await Upload.find(params.fileId);
            console.log("Params ===>>", await fileToUpdate.filename);
            var extname;
            var type;
            var subtype;
            // Uploads the file to Amazon S3 and stores the url
            const initPath = "hamasasafaris/uploads/";
            request.multipart.file('pic_image_update', {
                types: ['image'],
                size: '2mb'
            }, async (file) => {
                const s3Path = `${initPath}${fileToUpdate.filename}`;
                // console.log('file ====>>', s3Path);
                if (file) {
                    type = file.type;
                    subtype = file.subtype;
                    extname = file.extname;
                    console.log(`${fileToUpdate.filename.split('.')[0]}.${extname}`);
                    fileToUpdate.filename = `${fileToUpdate.filename.split('.')[0]}.${extname}`;
                    fileToUpdate.filepath = await Drive.disk('s3').put(s3Path, file.stream, { ACL: 'public-read', ContentType: `${type} / ${subtype}` });
                }
                fileToUpdate.metadata = type + '/' + subtype;
                console.log('answer ====>>> ', fileToUpdate);

            });
            await request.multipart.process();
            await fileToUpdate.save();
            return response.json({ status: false, notification: 'successfully updated uploaded file!' });

        } catch (error) {
            console.log(error);
            return response.json({ status: false, notification: 'failed to update uploaded file!' });
        }
    }
    async delete({ params, response }) {
        const { id, model } = params;
        try {
            let t = capitalize(model);
            const Drive = use('Drive');
            const Modal = use(`App/Models/${t}`);
            const Upload = use(`App/Models/Upload`);
            const Gallery = use(`App/Models/Gallery`);
            const itemToDelete = await Modal.find(id);
            console.log('t value ==>>', itemToDelete)
            switch (model) {
                case 'accommodation':
                    const accommodationGallery = await itemToDelete.gallery().fetch();
                    // const accommodationArticle = await itemToDelete.article().fetch();
                    if (accommodationGallery) {
                        /** model gallery exists */
                        console.log(await accommodationGallery.toJSON());
                        const galleryUploads = await Upload.find(await accommodationGallery.toJSON().id);
                        if (galleryUploads) {
                            /** Gallery uploads exist */
                            console.log('accommodation ===>>>', await galleryUploads);
                            await galleryUploads.delete();
                            await itemToDelete.delete();
                            await accommodationGallery.delete();

                        } else {
                            await itemToDelete.delete();
                            await accommodationGallery.delete();
                        }
                    } else {
                        await itemToDelete.delete();
                    }
                    break;

                case 'destination':
                    // const destinationArticle = await itemToDelete.article().fetch();
                    const destinationGalleryFetch = await itemToDelete.gallery().fetch();
                    if (destinationGalleryFetch) {
                        /** model gallery exists */
                        console.log(await destinationGalleryFetch.toJSON());
                        const destinationGallery = await Gallery.find(destinationGalleryFetch.toJSON().id);
                        const galleryUploads = await Upload.find(await destinationGalleryFetch.toJSON().id);
                        // const galleryUploads = await itemToDelete.uploads().fetch();
                        // for (const upload of galleryUploads.toJSON()) {
                        //     const uploads = await Upload.find(await upload.id);
                        //     console.log('gallery ===>>>', await uploads);
                        //     if (uploads) {
                        //         /** Gallery uploads exist */
                        //         console.log('gallery ===>>>', await uploads.toJSON());
                        //         await uploads.delete();
                        //     }
                        // }
                        if (galleryUploads) {
                            /** Gallery uploads exist */
                            console.log('destination ===>>>', await galleryUploads);
                            await galleryUploads.delete();
                            await itemToDelete.delete();
                            await destinationGallery.delete();

                        } else {
                            console.log('destination ===>>>', await destinationGallery.toJSON());
                            await itemToDelete.delete();
                            await destinationGallery.delete();
                        }
                    } else {
                        await itemToDelete.delete();
                    }
                    break;

                case 'gallery':
                    /** model gallery exists */
                    const galleryUploads = await itemToDelete.uploads().fetch();
                    for (const upload of galleryUploads.toJSON()) {
                        const uploads = await Upload.find(await upload.id);
                        console.log('gallery ===>>>', await uploads);
                        if (uploads) {
                            /** Gallery uploads exist */
                            console.log('gallery ===>>>', await uploads.toJSON());
                            await uploads.delete();
                        }
                    }

                    await itemToDelete.delete();

                    break;

                case 'itinerary':
                    /** model itinerary exists */
                    const PackageItinerary = use(`App/Models/PackageItinerary`);

                    const itineraryPackages = await PackageItinerary.query().where('itinerary_id', id).fetch();
                    const ItPck = await PackageItinerary.find(itineraryPackages.toJSON()[0].id);
                    ItPck.delete();
                    await itemToDelete.delete();

                    break;

                default:
                    await itemToDelete.delete();
                    break;
            }
            // await itemToDelete.delete();
            response.json({ status: true, notification: 'successfully deleted ' + model });
        } catch (error) {
            console.log(error);
            response.json({ status: false, notification: 'failed to deleted ' + model });
        }

    }
}

module.exports = ModelController
