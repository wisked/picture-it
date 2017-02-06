const mongoose = require('mongoose');
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

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

UserSchema.methods.setPassword = function(password) {
    this.local.hash = crypto.pbkdf2Sync(password, secret, 1000, 64).toString('hex');
}
UserSchema.methods.getHash = function(password) {
    return this.local.hash === crypto.pbkdf2Sync(password, secret, 1000, 64).toString('hex');
}
UserSchema.methods.generateJwt = function() {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000 + (60 * 60))
    }, "secret")
}
mongoose.model('User', UserSchema);
