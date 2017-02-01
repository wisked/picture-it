const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    _userId : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    likes   : [Schema.Types.ObjectId],
    cloudinary: {
        public_id : {type: String},
        url       : {type: String}
    }
})

mongoose.model('Image', ImageSchema);
