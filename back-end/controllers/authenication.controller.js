import mongoose from 'mongoose';
import passport from 'passport';

const User = mongoose.model('User')

const createAdmin = (req, res) => {
    let user = new User();
    user.isAdmin = true;
    user.local.username = 'admin';
    user.local.email = 'admin@admin';
    user.setPassword('admin');
    user.save(function(err, response) {
        if (err) {
            return;
        }
        else {
            let token;
            token = user.generateJwt();
            req.session._id = response._doc._id;
            req.session.isAdmin = response._doc.isAdmin;
            req.session.token = token;
            res.status(201).json({
                "token": token,
                "userIsAdmin": user.isAdmin,
                "name": user.local.username
            })
        }
    });
}


export const register = (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.password) {
        res.json({meassage: "all field required"})
    }
    else {
        let adminIsExist;
        User.findOne({'isAdmin': true}, (err, admin) => {
            if (err) {
                return;
            }
            console.log(adminIsExist);
            adminIsExist = admin;
        });
        if (!adminIsExist) {
            createAdmin(req, res);
        }
        let user = new User({})
        user.local.username = req.body.name;
        user.local.email = req.body.email;

        user.setPassword(req.body.password);
        user.save((err, response) => {
            if (err) {
                res.sendStatus(501)
            } else {
                let token = user.generateJwt();
                req.session._id = response._doc._id;
                req.session.isAdmin = response._doc.isAdmin
                req.session.token = token

                res.json({
                    "token": token,
                    "userIsAdmin": user.isAdmin,
                    "name": user.local.username
                })
            }
        })
    }
}

export const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400)
    }
    else {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                res.json({"err": err});
                return;
            }
            if (user) {
                let token = user.generateJwt()
                req.session._id = user._doc._id;
                req.session.isAdmin = user._doc.isAdmin;
                req.session.token = token;
                res.status(200).json({
                    "token": token,
                    "userIsAdmin": user._doc.isAdmin,
                    "name": user._doc.local.username
                })
            }
        })(req, res);
    }
}

export const logout = (req, res) => {
    req.session = null
}
