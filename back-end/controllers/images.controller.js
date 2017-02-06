import mongoose from 'mongoose';
import cloudinary from 'cloudinary';


import configs from '../../etc/config.json'

const Image = mongoose.model('Image');

const clodinaryConfigs = configs.cloudinary;

export const getUserImages = (req, res) => {
    const id = req.params.id ? req.params.id : req.session._id
    Image.find({
        "_userId": id
    }, (err, pic) => {
        if (err) {
            return;
        }
        else {
            let picUrls = []
            picUrls = pic.map((item) => {
                return {
                    id: item._id,
                    url: item.cloudinary.url,
                    likes: item.likes.length ? item.likes.length : 0
                }
            })
            res.status(200).send(picUrls)
        }
    })
}

export const deleteUserImage = (req, res) => {
    cloudinary.config(clodinaryConfigs)
    let userIsAdmin = req.session.user.isAdmin;

    if (req.params.id && userIsAdmin) {
        findAndRemove(req, res)
    }
    else if (req.session._id) {
        findAndRemove(req, res)
    }
    else{
        res.sendStatus(403)
    }
}

export const uploadImage = (req, res, next) => {
    cloudinary.config(clodinaryConfigs)
    let images = [];
    let promiseArray = [];
    if (req.files.files.length) {
        if (req.params.id && req.session.user.isAdmin || req.session._id) {
            req.files.files.forEach(img => {
                let id = req.params.id ? req.params.id : req.session._id
                promiseArray.push(loadImage(img, id))
            })
            Promise.all(promiseArray).then(result => {
                res.status(201).send(result)
            })
        }
    }
    else {
        next()
    }
}

export const addLike = (req, res) => {
    let id = req.params.id ? req.params.id : req.session._id

    Image.findById(req.body.image_id, (err, img) => {
        if (err) {
            return;
        }
        if (img.likes.indexOf(id) == -1) {
            img.likes.push(id)
        }
        else {
            let index = img.likes.indexOf(id)
            img.likes.splice(index, 1)
        }
        img.save((err, response) => {
            if (err) {
                return;
            }
            res.status(201).send({likes: response.likes.length})
        })
    })
}

const loadImage = (img, id) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(img.path, function (result) {
                if (result.url) {
                    let image = new Image();
                    image._userId = id
                    image.cloudinary.public_id = result.public_id
                    image.cloudinary.url = result.url

                    image.save((err, response) => {
                        if (err) {
                            reject('mongodb err')
                        }
                        let likes = response.likes.length ? response.likes.length : 0
                        resolve({id: image._id, url: image.cloudinary.url, likes: likes})
                    })
                }
                else {
                    reject('cloudinary err');
                }
        });
    })
}

const findAndRemove = (req, res) => {
    Image.findByIdAndRemove(req.body.id, (err, user) => {
        if (err) {
            return;
        }
        else {
            cloudinary.uploader.destroy(user.cloudinary.public_id, result => res.status(200).send(result))
        }
    })
}
