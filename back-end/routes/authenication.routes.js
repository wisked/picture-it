const router = require('express').Router();
const authCtrl = require('../controllers/authenication.controller');

router.post('/login', authCtrl.login)
router.post('/register', authCtrl.register)
router.get('/logout', authCtrl.logout)
// router.get('/compare-jwt', authCtrl.compareJWT)

module.exports = router;
