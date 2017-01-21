const cloudinary = require('cloudinary');
const mongoose = require('mongoose');


const Image = mongoose.model('Image');

cloudinary.config({
    cloud_name: 'dyyb6i3aq',
    api_key   : '486978629141521',
    api_secret: '50k2fAEiTFQPzgBei6-y8WF-Cq8'
})

module.exports.uploadImage = (req, res, next) => {
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
