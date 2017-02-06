import multiparty from 'connect-multiparty';
const multipartyMiddleware = multiparty()

const router = require('express').Router();
const imgCtrl = require('../controllers/images.controller');


router.get('/getImages/:id?', imgCtrl.getUserImages)
router.post('/delete-image/:id?', imgCtrl.deleteUserImage)
router.post('/loadImgs/:id?', multipartyMiddleware, imgCtrl.uploadImage)
router.post('/add-like/:id?', imgCtrl.addLike)


module.exports = router;
