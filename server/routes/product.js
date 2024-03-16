const router = require('express').Router()
const ctrls = require('../controllers/product')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

//CRUD
router.post('/createproduct',[verifyAccessToken, isAdmin] ,ctrls.createProduct)
router.get('/getproduct/:pid', ctrls.getProduct)
router.get('/', ctrls.getProducts)
router.post('/updateproduct/:pid',[verifyAccessToken, isAdmin], ctrls.updateProduct)
router.post('/deleteproduct/:pid',[verifyAccessToken, isAdmin], ctrls.deleteProduct)
//Vote *
router.post('/rating', verifyAccessToken, ctrls.Rating)
//chen anh 
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images'), ctrls.uploadImageProduct)

module.exports = router