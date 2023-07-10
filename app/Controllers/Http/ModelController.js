'use strict'

const capitalize = s => s.replace(/./, c => c.toUpperCase());
class ModelController {
    async index({ auth, params, view }) {
        try {
            console.log(await auth.getUser());
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
            console.log('models ===>', params.model)
            if (!params.model == 'gallery') {
            } else {
                model = await Modal.query().fetch();
            }
            try {
                model = await Modal.query().with('gallery').fetch();
            } catch (error) {
                model = await Modal.query().fetch();
            }
            // const galleriess = await model.gallery().fetch()
            // const galleries = JSON.parse(JSON.stringify(await model));
            // console.log('galleries ====>>>', galleries)
            const models = JSON.parse(JSON.stringify(await model));
            const final = [];
            const Gal = use('App/Models/Gallery');

            for (const value of models) {
                if (!value['gallery_id'] === null) {
                    console.log('list invoked!', await value);
                    const gall = await Gal.find(value.gallery_id);
                    value['gallery'] = await gall.toJSON();

                    final.push(await value);
                } else {
                    final.push(await value);
                }
            }
            console.log(...final)

            let editRoute = `/admin/edit/${params.model}`;
            let delRoute = `/admin/delete/${params.model}`;
            let uploadRoute = `/admin/upload/${params.model}`;
            return await view.render(`admin.${params.model}.list`, { items: final, model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });
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
            console.log('list invoked!', model);
            let action = `/admin/store/${params.model}`
            return await view.render(`admin.${params.model}.create`, { [`${params.model}`]: model, action: action });
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
            // console.log('list invoked!', model);
            let action = `/admin/update/${params.model}/${params.id}`
            return await view.render(`admin.${params.model}.create`, { [`${params.model}`]: model, action: action });
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
        }
    }

    async store({ auth, params, request, response, view }) {
        try {
            let t = capitalize(params.model);
            console.log(t);

            const Modal = use(`App/Models/${t}`);
            const Gallery = use(`App/Models/Gallery`);
            let newModal = new Modal();
            const object = request.body;
            for (const key in object) {
                if (key !== '_csrf') {
                    newModal[key] = object[key];
                }
            }
            const gal = new Gallery();
            switch (params.model) {
                case 'gallery':

                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    break;

                case 'accommodation':

                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    break;

                case 'destination':

                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    break;

                case 'attraction':

                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    break;

                default:
                    break;
            }


            await newModal.save();
            response.json({ status: true, notification: 'successfully added ' + params.model });
        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, notification: 'failed to add ' + params.model });
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

            let editRoute = `/admin/edit/${model}`;
            let delRoute = `/admin/delete/${model}`;
            let uploadRoute = `/admin/upload/${model}`;
            const modelValue = JSON.parse(JSON.stringify(await gallery))
            return await view.render(`admin.${model}.gallery`, { items: JSON.parse(JSON.stringify(uploads)), modelValue: modelValue[0]['gallery'], model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });

        } catch (error) {

        }
    }

    async saveupload({ auth, params, request, response, view }) {

        try {
            let t = capitalize(params.model);
            const Drive = use('Drive');
            const Modal = use(`App/Models/${t}`);
            const Upload = use(`App/Models/Upload`);
            const { v4 } = require('uuid');
            const path = require('path');
            const name = v4();
            var extname;
            var type;
            var subtype;
            var filepath;
            // Uploads the file to Amazon S3 and stores the url
            request.multipart.file('pic_image', {
                types: ['image'],
                size: '2mb'
            }, async (file) => {

                type = file.type;
                subtype = file.subtype;
                extname = file.extname;
                let mimeType = type + '/' + subtype;
                let fileType = mimeType;
                const s3Path = `hamasasafaris/uploads/${name}.${extname}`
                filepath = await Drive.disk('s3').put(s3Path, file.stream, { ACL: 'public-read', ContentType: `${type}/${subtype}` });
                // console.log('answer ====>>> ', ans);

            });

            let processedData = await request.multipart.process()
            console.log('processed data ====>>>>', await processedData);
            let imageModal = new Upload();
            imageModal.gallery_id = params.id;
            imageModal.filepath = filepath;
            imageModal.metadata = subtype;
            imageModal.caption = request.input('caption');
            imageModal.filename = `${name}.${extname}`;
            await imageModal.save();
            console.log('saved here!! ====>>>>');
            response.json({ status: true, notification: 'successfully uploaded file ' });

        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, notification: 'failed to add ' + params.model });
        }
    }
}

module.exports = ModelController
