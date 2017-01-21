const router = require('express').Router();
const imgCtrl = require('../controllers/images.controller');


router.get('/users-list', imgCtrl.getUsersList)
router.get('/user-info', imgCtrl.getUserInfo)
router.get('/set-userVissibility', imgCtrl.setUserVisability)


module.exports = router;
