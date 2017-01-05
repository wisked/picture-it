const passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Image = mongoose.model('Image');

const sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
// const createAdmin = () => {
//     User.findOneAndUpdate({"isAdmin": true}, {
//         local.name: 'admin',
//         local.email: 'ad@ad',
//         user.setPassword(req.body.password);
//     }, (err) => {
//         if (err) {
//             handleError(err);)
//         }
//         else {
//             token = user.generateJwt();
//             req.session._id = response._doc._id;
//             req.session.token = token;
//             sendJSONresponse(res, 200, {
//                 "token": token,
//                 "userIsAdmin": user.isAdmin
//             });
//         }
//     })
// }
module.exports.register = function(req, res) {

    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
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
            req.session.token = token;
            sendJSONresponse(res, 200, {
                "token": token,
                "userIsAdmin": user.isAdmin
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
            req.session.token = token;
            sendJSONresponse(res, 200, {
                "token": token,
                "userIsAdmin": user.isAdmin
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
    let user;
    User.findOne({"_id": req.session._id}, (err, user) => {
        if (err) res.send(403)
        user = user.isAdmin;
    });
    console.log(user);
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
    let userIsAdmin;
    User.find({"_id": req.session._id}, (err, user) => {
        if (err) {
            return handleError(err);
        }
        console.log(user);
    })
    // if (userIsAdmin) {
        User.find({}, function(err, users) {
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
    // }
    // else {
    //     User.find({"profileIsVisible": true}, function(err, users) {
    //         let userMap = {};
    //         userMap = users.map(item => {
    //             return {
    //                 _id: item.id,
    //                 name: item.local.name
    //             }
    //         })
    //         if (err) {
    //             return handleError(err)
    //         }
    //         else {
    //             res.status(200).send(userMap)
    //         }
    //     });
    // }

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
function handleError(err) {
    console.log(err)
}
