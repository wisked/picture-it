const mongoose = require('mongoose');

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    _imageId: { type: Schema.Types.ObjectId, ref: 'Image'},
    _userId : { type: Schema.Types.ObjectId, ref: 'User'},
    text    : {type: String}
})

mongoose.model('Comment', CommentSchema);
