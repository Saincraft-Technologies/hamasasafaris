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
            const model = await Modal.all();
            const models = JSON.parse(JSON.stringify(await model));
            const final = [];
            console.log('list invoked!', await models);
            const Gal = use('App/Models/Gallery');
            for (const value of models) {
                if (!value['gallery_id'] === null) {
                    const gall = await Gal.find(value.gallery_id);
                    value['gallery'] = await gall.toJSON();
                    final.push(await value);
                } else {
                    final.push(await value);
                }
            }


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

    async saveupload({ auth, params, request, response, view }) {

        try {
            let t = capitalize(params.model);
            const Drive = use('Drive');
            const Helpers = use('Helpers')

            console.log('am here ===>>>', request._files);
            const Modal = use(`App/Models/${t}`);
            const Upload = use(`App/Models/Upload`);
            let imageModal = new Upload();
            const folder = '/public/uploads/';

            const picture = request.file('pic_image', {
                types: ['image'],
                size: '2mb'
            });
            // await picture.move(Helpers.tmp(), {
            //     name: new Date().toISOString() + `${params.model}.jpg`,
            //     overwrite: true
            // })

            // if (!picture.moved()) {
            //     console.log(picture.error());
            //     return picture.error()
            // }
            const { v4 } = require('uuid');
            const fs = require('fs');
            const path = require('path');

            const { type, subtype, extname } = picture;

            let mimeType = type + '/' + subtype;
            let fileType = mimeType;
            const name = v4() + "." + extname;
            // Sets the path and move the file
            const filePath = `${path.resolve(`./tmp/public/uploads/`)}/${name}`;
            const s3filePath = `${path.resolve(`./hamasasafaris/uploads/`)}/${name}`;
            await picture.move(Helpers.tmpPath(folder), { name: name, overwrite: true })
            // create readable stream
            const fileStream = await fs.createReadStream(filePath)
            const fileSize = await picture.stream.byteCount

            // Uploads the file to Amazon S3 and stores the url
            const s3Path = `hamasasafaris/uploads/${name}`
            await Drive.disk('s3').put(s3Path, fileStream, { ACL: 'public-read', ContentType: `${picture.type}/${picture.subtype}` })
            const fileUrl = await Drive.disk('s3').getUrl(s3Path)

            // Destroy the readable stream and delete the file from tmp path
            await fileStream._destroy(null, err => {
                console.log(err);
            })
            await Drive.delete(filePath)


            // if (fileUrl) {

            imageModal.gallery_id = params.id;
            imageModal.filepath = fileUrl;
            imageModal.metadata = picture.subtype;
            imageModal.caption = request.input('caption');
            imageModal.filename = name;
            console.log(await fileUrl);
            await imageModal.save();
            return response.json({ status: true, notification: 'successfully added ' + params.model });
            // }
            // if (!picture.moved()) {
            //     console.log(picture.error());
            //     return picture.error()
            // }
            // console.log(picture)
            // // if (request.file) {


            // // } else {
            // //     const object = request.body;
            // //     for (const key in object) {
            // //         if (key !== '_csrf') {
            // //             newModal[key] = object[key];
            // //         }
            // //     }
            // // }
            // console.log(t);
        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, notification: 'failed to add ' + params.model });
        }
    }
}

module.exports = ModelController
