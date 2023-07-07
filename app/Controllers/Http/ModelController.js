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

            console.log('am here ===>>>', request._files);
            const Modal = use(`App/Models/${t}`);
            const Upload = use(`App/Models/Upload`);
            let imageModal = new Upload();

            const picture = request.file('pic_image', {
                types: ['image'],
                size: '2mb'
            })

            require('aws-sdk/lib/maintenance_mode_message').suppress = true;
            const AWS = require('aws-sdk');

            const { v4 } = require('uuid');

            const uploadToSpace = async (file, bucket, folderpath) => {
                const s3 = new AWS.S3({
                    endpoint: process.env.S3ENDPOINT + '/' + folderpath,
                    region: 'fra1',
                    secretAccessKey: process.env.NDOOFUNGUO,
                    accessKeyId: process.env.NDOOSIRI
                })
                const { type, subtype, extname } = file;

                let mimeType = type + '/' + subtype;
                let fileType = mimeType;

                const name = v4() + "." + extname;

                let buffer = Buffer.from(JSON.stringify(file), 'utf-8');

                await s3.putObject({
                    Key: name,
                    Bucket: bucket,
                    ContentType: fileType,
                    Body: buffer.toString("base64"),
                    ACL: 'public-read',
                }).promise();
                let keyy = 'DO00V66TRWHZXCL8CM48';
                let urll = 'https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com'
                let secr = '2oBSgaKqRb6+6ZR0CK7Z1UvUKS3vQGF4JA24C9vCyQ4';

                let url = `https://${bucket}.fra1.digitaloceanspaces.com/${folderpath}`;
                console.log(url);
                return { key: name, url }
            }


            // await picture.move('./public/uploads/', {
            //     name: new Date().toISOString() + `${params.model}.jpg`,
            //     overwrite: true
            // })
            if (picture) {
                const asn = await uploadToSpace(picture, 'saincrafttechnologies-static-public-2023', 'hamasasafaris/uploads');

                imageModal.gallery_id = params.id;
                imageModal.filepath = asn.url + '/' + asn.key;
                imageModal.metadata = picture.subtype;
                imageModal.caption = request.input('caption');
                imageModal.filename = asn.key;
                console.log(await asn);
                await imageModal.save();
                return response.json({ status: true, notification: 'successfully added ' + params.model });
            }
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
