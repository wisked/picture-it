import mongoose from 'mongoose';
import passport from 'passport';
cosnt User = mongoose.model('User')

export const register = (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.password) {
        res.json({meassage: "all field required"})
    }
    else {
        let user = new User({
            local.name = req.body.name;
            local.email = req.body.email;
        })
        user.setPassword(req.body.password);
        user.save((err, response) => {
            if (err) {
                res.send(501)
            } else {
                let token;
                token = user.generateJwt();
                req.session._id = response._doc._id;
                // req.session.isAdmin =
                req.session.token = token;
                
            }
        })
    }
}
