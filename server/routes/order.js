const router = require('express').Router()
const ctrls = require('../controllers/order')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

//CRUD
router.post('/create',verifyAccessToken, ctrls.createOrder)
router.post('/status/:oid', [verifyAccessToken, isAdmin], ctrls.updateStatus)
router.get('/get',verifyAccessToken, ctrls.getOrder)
router.get('/gets', [verifyAccessToken, isAdmin], ctrls.getOrders)

module.exports = router