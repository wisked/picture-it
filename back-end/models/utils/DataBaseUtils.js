const mongoose = require('mongoose');


// require('../User');
// require('../Image');

const config = require('../../../etc/config.json')

// const User = mongoose.model('User');
// const Image = mongoose.model('Image');

module.exports.setUpConnection = () => {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
    console.log(`connected mongodb ${config.db.host}:${config.db.port}/${config.db.name}`);
}
