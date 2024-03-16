const router = require('express').Router()
const ctrls = require('../controllers/brand')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/createbrand',[verifyAccessToken, isAdmin] ,ctrls.createBrand)
router.get('/', ctrls.getBrands)
router.post('/:cid',[verifyAccessToken, isAdmin] ,ctrls.deleteBrand)

module.exports = router