import mongoose from 'mongoose';
import cloudinary from 'cloudinary';


import configs from '../../etc/config.json'

const Image = mongoose.model('Image');

const clodinaryConfigs = configs.cloudinary;

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
    cloudinary.config(clodinaryConfigs)
    let images = [];
    if (req.files.length) {
        cloudinary.uploader.upload(req.files[0].path, function (result) {
                if (result.url) {
                    let image = new Image();
                    image = {
                        _owner: req.params.id ? req.params.id : req.session._id,
                        cloudinary: {
                            public_id: result.public_id,
                            url: result.url
                        }
                    }
                    image.save((err, response) => {
                        images.push(result.url)
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                else {
                    console.log("errro");
                    res.json(error);
                }
            });


        // req.files.forEach(file => {
        //     cloudinary.uploader.upload(file.path, function (result) {
        //         if (result.url) {
        //             let image = new Image();
        //             image = {
        //                 _owner: req.params.id ? req.params.id : req.session._id,
        //                 cloudinary: {
        //                     public_id: result.public_id,
        //                     url: result.url
        //                 }
        //             }
        //             image.save((err, response) => {
        //                 images.push(result.url)
        //             })
        //         } else {
        //             res.json(error);
        //         }
        //     });
        // })
        // res.status(201).send({images: images})
    }
    else {
        next();
    }
}
export const getImageInfo = (req, res) => {

}
