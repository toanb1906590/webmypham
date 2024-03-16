const router = require('express').Router()
const ctrls = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

//dang nhap, dang ky, dang xuat
router.post('/register', ctrls.register)
router.get('/finalregister/:token', ctrls.finalregister)
router.post('/login', ctrls.login)
router.post('/logout', verifyAccessToken, ctrls.logout)
//CRUD
router.post('/update', ctrls.update)
router.get('/getone', ctrls.getone)
router.get('/current', verifyAccessToken, ctrls.getCurrent)
router.get('/getall', [verifyAccessToken, isAdmin], ctrls.getUser)
router.post('/deleteuser', [verifyAccessToken, isAdmin], ctrls.deleteUser)
router.put('/updateuser', verifyAccessToken, ctrls.updatedUser)
router.post('/updateuserisadmin', [verifyAccessToken, isAdmin], ctrls.updatedUserisAdmin)
//!==
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.post('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.post('/updateaddress', verifyAccessToken , ctrls.updateUserAddress)
router.put('/updatecart', verifyAccessToken, ctrls.updateCart)
router.get('/getcart', verifyAccessToken, ctrls.updateCart)

module.exports = router