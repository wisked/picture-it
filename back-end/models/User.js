const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const secret = "123"

const UserSchema = new Schema({
    profileIsVisible: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    local: {
        username: {type: String, required: true},
        email   : {type: String, required: true},
        hash    : {type: String, required: true}
    }
})

const User = mongoose.model('User': UserSchema);
