const router = require('express').Router();
const authCtrl = require('../controllers/authenication.controller');

router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.get('/logout', authCtrl.logout)


module.exports = router;
