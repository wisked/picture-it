const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressSession = require('express-session');
import passport from 'passport';

const db = require('./back-end/models/utils/DataBaseUtils')

// const userRoutes = require('./back-end/routes/user.routes')
const imageRoutes = require('./back-end/routes/image.routes')
const authRoutes = require('./back-end/routes/authenication.routes')

const configs = require('./etc/config.json')

const app = express()

db.setUpConnection()
import './back-end/models/User'
import './back-end/models/Image'

import './back-end/controllers/configs/passport';

app.set("port", configs.serverPort || 3000);
app.use(express.static(path.join(__dirname + '/front-end')))
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))


require('express-debug')(app, {

});


app.get('/', (req, res) => {
    res.sendFile('./client/index.html')
})
app.use('/', authRoutes)
app.use('/api', imageRoutes)
// app.use('/api', userRoutes)


app.listen(configs.serverPort, () => {
    console.log(`listening port ${configs.serverPort}`);
})
