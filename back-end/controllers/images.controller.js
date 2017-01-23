import mongoose from 'mongoose';

const Image = mongoose.model('Image');


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

export const getImageInfo = (req, res) => {

}
