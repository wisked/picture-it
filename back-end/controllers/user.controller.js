const mongoose = require('mongoose');

const User = mongoose.model('User');


module.exports.getUsersList = (req, res) => {
    let userIsAdmin = req.session.isAdmin;
    let query = {};
    let profile = {
        "profileIsVisible": true
    }

    query = userIsAdmin ? {} : profile
    User.find(query, function(err, users) {
        let userMap = {};
        userMap = users.map(item => {
            return {
                _id: item.id,
                name: item.local.username
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

module.exports.setUserVisibility = (req, res) => {
    User.findOne({
        _id: req.session._id
    }, (err, user) => {
        if(err) {
            return;
        }
        else {
            res.send({profile: user.profileIsVisible})
        }
    })
}
