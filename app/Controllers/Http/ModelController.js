'use strict'

const capitalize = s => s.replace(/./, c => c.toUpperCase());
class ModelController {
    async index({ auth, params, view }) {
        try {
            console.log(await auth.getUser());
            let t = capitalize(params.model);
            // console.log(params);

            const Modal = use(`App/Models/${t}`);
            let model = await Modal.all();
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
            let model = await Modal.all();
            let headers = [];
            for (const key in model.toJSON()[0]) {
                switch (key.includes('_')) {
                    case true:
                        headers.push(key.split('_')[0]);
                        break;

                    default:
                        headers.push(key);
                        break;
                }
            }
            // console.log('list invoked!', headers);
            let editRoute = `/admin/edit/${params.model}`;
            let delRoute = `/admin/delete/${params.model}`;
            let uploadRoute = `/admin/upload/${params.model}`;
            return await view.render(`admin.${params.model}.list`, { items: model.toJSON(), headers: headers, model: params.model, delRoute: delRoute, editRoute: editRoute, uploadRoute: uploadRoute });
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
            let model = await Modal.find(params.id);
            let action = `/admin/upload/${params.model}/${params.id}`
            return await view.render(`admin.${params.model}.upload`, { [`${params.model}`]: model, action: action });
        } catch (error) {
            console.log(error);
        }
    }

    async store({ auth, params, request, response, view }) {
        try {
            let t = capitalize(params.model);
            // console.log(t);

            const Modal = use(`App/Models/${t}`);
            const Gallery = use(`App/Models/Gallery`);
            let newModal = new Modal();
            const object = request.body;
            for (const key in object) {
                if (key !== '_csrf') {
                    newModal[key] = object[key];
                }
            }
            // before save add gallery if model is contains gallery

            let gal = new Gallery();
            switch (params.model) {
                case 'accommodation':
                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    await newModal.save();
                    break;
                case 'attraction':
                    gal.gallery = request.input(`attraction`);
                    console.log(gal);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    await newModal.save();
                    break;
                case 'stopPoint':
                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    await newModal.save();
                    break;
                case 'destination':
                    gal.gallery = request.input(`${params.model}`);
                    gal.save();
                    newModal.gallery_id = gal.id;
                    await newModal.save();
                    break;

                default:
                    await newModal.save();
                    break;
            }
            response.json({ status: true, notification: 'successfully added ' + params.model });
        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, notification: 'failed to add ' + params.model });
        }
    }

    async saveupload({ auth, params, request, response, view }) {
        try {
            let t = capitalize(params.model);
            // console.log(t);

            const Modal = use(`App/Models/${t}`);
            let newModal = new Modal();
            const object = request.body;
            for (const key in object) {
                if (key !== '_csrf') {
                    newModal[key] = object[key];
                }
            }
            await newModal.save();
            response.json({ status: true, notification: 'successfully added ' + params.model });
        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, notification: 'failed to add ' + params.model });
        }
    }
}

module.exports = ModelController
