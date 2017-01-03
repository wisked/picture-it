const passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Image = mongoose.model('Image');

const sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

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
                "token": token
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
    }, {"profileIsVisible": req.body.profile}, (err, response) => {
            if (err) {
                return handleError(err)
            }
            res.status(200).json({message: response})
        }
    )
}

module.exports.delete = function(req, res) {
    Image.remove({
        "url": req.body.url
    }, (err) => {
        if (err) {
            return handleError(err)
        } else
            res.status(200).json({'message' : 'success'})
    })
}

function handleError(err) {
    console.log(err)
}
