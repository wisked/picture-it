import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

import configs from '../../etc/config.json'

const Image = mongoose.model('Image');

const clodinaryConfigs = configs.cloudinary;

cloudinary.config(clodinaryConfigs)

export const getUserImages = (req, res) => {
    Image.find({
        "_owner": req.query.id
    }, (err, pic) => {
        if (err) {
            return;
        }
        else {
            let picUrls = []
            picUrls = pic.map((item) => {
                return {
                    id: item._id,
                    url: item.url
                }
            })
            res.status(200).send(picUrls)
        }
    })
}

export const deleteUserImage = (req, res) => {
    let userIsAdmin = req.session.isAdmin;

    if(userIsAdmin && req.body.user)
        Image.remove({
            "url": req.body.url
        }, (err) => {
            if (err) {
                return;
            } else
                res.status(200).json({
                    'message': 'success'
                })
        })
}

export const uploadImage = (req, res, next) => {
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, function (result) {
                if (result.url) {
                    let image = new Image();
                    image.url = result.url;
                    image._owner = req.params.id ? req.params.id : req.session._id;
                    image.save((err, response) => {
                        res.status(201).json(result.url)
                    })
                } else {
                    res.json(error);
                }
            });
        }
        else {
            next();
        }
    }
export const getImageInfo = (req, res) => {

}
