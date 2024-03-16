const router = require('express').Router()
const ctrls = require('../controllers/coupon')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/createcoupon',[verifyAccessToken, isAdmin] ,ctrls.createCoupon)
router.get('/', ctrls.getCoupons)
router.put('/update/:cid', [verifyAccessToken, isAdmin], ctrls.updateCoupon)

module.exports = router