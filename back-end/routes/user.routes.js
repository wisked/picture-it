const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');


router.get('/users-list', userCtrl.getUsersList)
router.get('/user-info', userCtrl.getUserInfo)
router.get('/user-visibility', userCtrl.setUserVisibility)

module.exports = router;
