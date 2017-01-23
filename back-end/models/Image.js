const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    _userId : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    url     : {type: String},
    likes   : [Schema.Types.ObjectId]
})

mongoose.model('Image', ImageSchema);
