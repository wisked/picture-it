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
                    url: item.cloudinary.url
                }
            })
            res.status(200).send(picUrls)
        }
    })
}

export const deleteUserImage = (req, res) => {
    cloudinary.config(clodinaryConfigs)
    let userIsAdmin = req.session.isAdmin;


    Image.findByIdAndRemove(req.body.id, (err, user) => {
        if (err) {
            return;
        }
        else {
            cloudinary.uploader.destroy(user.cloudinary.public_id, result => res.status(200).send(result))
        }
    })
}

export const uploadImage = (req, res, next) => {
    cloudinary.config(clodinaryConfigs)
    let images = [];
    if (req.files.files.length) {
        let promise = new Promise((resolve, reject) => {

            req.files.files.forEach(file => {
                cloudinary.uploader.upload(file.path, function (result) {
                        if (result.url) {
                            let image = new Image();
                            image._userId = req.params.id ? req.params.id : req.session._id
                            image.cloudinary.public_id = result.public_id
                            image.cloudinary.url = result.url

                            image.save((err, response) => {
                                if (err) {
                                    resolve('mongodb err')
                                }
                                images.push({public_id: result.public_id, url: result.url})
                            })
                        }
                        else {
                            reject('cloudinary err');
                        }
                });
            })
            resolve(images)
        })
        promise
            .then(
                result => {
                    console.log(result);
                    // res.status(200).send({images: result})
                },
                error => res.sendStatus(500)
            )

        // res.status(200).send({images: images})
    }
    else {
        next();
    }
}

export const getImageInfo = (req, res) => {

}
