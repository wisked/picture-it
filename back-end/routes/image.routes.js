const router = require('express').Router();
const imgCtrl = require('../controllers/images.controller');


router.get('/images', imgCtrl.getUserImages)
router.post('/delete-img', imgCtrl.deleteUserImage)
router.post('/loadImgs', imgCtrl.uploadImage)


module.exports = router;
