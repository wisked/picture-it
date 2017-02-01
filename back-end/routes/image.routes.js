import multiparty from 'connect-multiparty';
const multipartyMiddleware = multiparty()

const router = require('express').Router();
const imgCtrl = require('../controllers/images.controller');


router.get('/images', imgCtrl.getUserImages)
router.post('/delete-img', imgCtrl.deleteUserImage)
router.post('/loadImgs', multipartyMiddleware, imgCtrl.uploadImage)
router.post('/loadImgs/', multipartyMiddleware, imgCtrl.uploadImage)


module.exports = router;
