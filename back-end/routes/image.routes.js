const router = require('express').Router();
const imgCtrl = require('../controllers/images.controller');


router.post('/images', imgCtrl.getUserImages)
router.post('/delete-img', imgCtrl.deleteUserImage)


module.exports = router;
