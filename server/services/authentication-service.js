const passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Image = mongoose.model('Image');

const sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
const createAdmin = () => {
    let user = new User();
    user.isAdmin = true;
    user.local.name = 'admin';
    user.local.email = 'admin@admin';
    user.setPassword('admin');
    user.save(function(err, response) {
        let token;

        if (err) {
            return;
        }
    });

}
module.exports.register = function(req, res) {

    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    let adminIsExist;
    User.findOne({'isAdmin': true}, (err, admin) => {
        if (err) {
            return handleError(err);
        }
        adminIsExist = admin;
    });
    if (!adminIsExist) {
        createAdmin();
    }
    let user = new User();
    user.local.name = req.body.name;
    user.local.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err, response) {
        let token;

        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            req.session._id = response._doc._id;
            req.session._isAdmin = false
            req.session.token = token;
            sendJSONresponse(res, 200, {
                "token": token,
                "userIsAdmin": user.isAdmin,
                "name": user.local.name
            });
        }
    });
};

module.exports.login = function(req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info) {
        let token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            req.session._id = user._doc._id;
            req.session._isAdmin = user.isAdmin
            req.session.token = token;
            sendJSONresponse(res, 200, {
                "token": token,
                "userIsAdmin": user.isAdmin,
                "name": user.local.name
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};

module.exports.update = function(req, res) {
    User.update({
        "_id": req.session._id
    }, {
        "profileIsVisible": req.body.profile
    }, (err, response) => {
        if (err) {
            return handleError(err)
        }
        res.status(200).json({
            message: response
        })
    })
}

module.exports.delete = function(req, res) {
    let userIsAdmin = req.session._isAdmin;
    // User.findOne({"_id": req.session._id}, (err, user) => {
    //     if (err) res.send(403)
    //     user = user.isAdmin;
    // });
    Image.remove({
        "url": req.body.url
    }, (err) => {
        if (err) {
            return handleError(err)
        } else
            res.status(200).json({
                'message': 'success'
            })
    })
}
module.exports.getUsers = function(req, res) {
    let userIsAdmin = req.session._isAdmin;
    let query = {};
    let profile = {
        "profileIsVisible": true
    }
    // User.find({_id: req.session._id}, (err, user) => {
    //     if (err) {
    //         return handleError(err);
    //     }
    //     console.log(user[0]);
    //     user = user
    // })
    query = userIsAdmin ? {} : profile
    User.find(query, function(err, users) {
        let userMap = {};
        userMap = users.map(item => {
            return {
                _id: item.id,
                name: item.local.name
            }
        })
        if (err) {
            return handleError(err)
        }
        else {
            res.status(200).send(userMap)
        }
    });

}
module.exports.userInfo = function(req, res) {
    Image.find({
        "_owner": req.query.id
    }, (err, pic) => {
        if (err) {
            return handleError(err)
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

module.exports.userVisibility = (req, res) => {
    User.findOne({
        _id: req.session._id
    }, (err, user) => {
        if(err) {
            return handleError(err)
        }
        else {
            res.send({profile: user.profileIsVisible})
        }
    })
}
module.exports.deleteUserImg = (req, res) => {
    let userIsAdmin = req.session._isAdmin;
    // User.findOne({"_id": req.session._id}, (err, user) => {
    //     if (err) res.send(403)
    //     user = user.isAdmin;
    // });
    if(userIsAdmin && req.body.user)
        Image.remove({
            "url": req.body.url
        }, (err) => {
            if (err) {
                return handleError(err)
            } else
                res.status(200).json({
                    'message': 'success'
                })
        })
}
function handleError(err) {
    console.log(err)
}
