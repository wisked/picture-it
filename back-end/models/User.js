const mongoose = require('mongoose');
import crypto from 'crypto';

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
    this.local.hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
}
UserSchema.methods.getHash = function(password) {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}
mongoose.model('User', UserSchema);
