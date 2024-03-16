const router = require('express').Router()
const ctrls = require('../controllers/blogCategory')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/createcategory',[verifyAccessToken, isAdmin] ,ctrls.createCategory)
router.get('/', ctrls.getCategory)
router.post('/:cid',[verifyAccessToken, isAdmin] ,ctrls.deleteCategory)

module.exports = router