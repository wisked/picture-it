const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressSession = require('express-session');
const db = require('./back-end/models/utils/DataBaseUtils')

const userRoutes = require('./back-end/routes/user.routes')
const imageRoutes = require('./back-end/routes/image.routes')
const authRoutes = require('./back-end/routes/authenication.routes')

const configs = require('./etc/config.json')

const app = express()

db.setUpConnection()
// require('./back-end/controllers/configs/passport')

app.set("port", configs.serverPort || 3000);
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname + '/client')))

require('express-debug')(app, {

});


app.get('/', (req, res) => {
    res.sendFile('./client/index.html')
})
app.use('/', authRoutes)
app.use('/api', imageRoutes)
app.use('/api', userRoutes)


app.listen(configs.serverPort, () => {
    console.log(`listening port ${configs.serverPort}`);
})
