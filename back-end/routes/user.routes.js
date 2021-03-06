const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');


router.get('/get-usersList', userCtrl.getUsersList)
router.post('/set-userVisibility', userCtrl.setUserVisibility)
router.get('/check-userProfile/:id?', userCtrl.checkProfileVisability)
router.get('/get-userName', userCtrl.getUserName)

module.exports = router;
