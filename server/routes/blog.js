const router = require('express').Router()
const ctrls = require('../controllers/blog')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

//CRUD
router.post('/createblog',[verifyAccessToken, isAdmin] ,ctrls.createBlog)
router.post('/updateblog',[verifyAccessToken, isAdmin] ,ctrls.updateBlog)
router.delete('/delete/:bid',[verifyAccessToken, isAdmin], ctrls.deleteBlog )
router.get('/', ctrls.getBlogs)
router.get('/:bid', ctrls.getBlog)
//Like, dislike blog
router.put('/like/:bid', verifyAccessToken, ctrls.likeBlog)
router.put('/dislike/:bid', verifyAccessToken, ctrls.dislikeBlog)
//upload images blog
router.put('/uploadimage/:bid', [verifyAccessToken, isAdmin],uploader.single('image'), ctrls.uploadImageBlog)

module.exports = router