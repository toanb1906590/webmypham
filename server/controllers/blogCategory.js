const blogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req,res) => {
    const blogcategory = await blogCategory.create(req.body)
    return res.status(200).json({
        success: true,
        blogcategory
    })
})

const getCategory = asyncHandler (async(req,res) => {
    const blogcategory = await blogCategory.find()
    return res.status(200).json({
        success: true,
        blogcategory
    })
})

const updateCategory = asyncHandler(async(req,res) => {
    const {cid} = req.params
    const blogcategory = await blogCategory.findByIdAndUpdate(cid, req.body, {new: true})
    return res.status(200).json({
        success: true,
        blogcategory
    })
})

const deleteCategory = asyncHandler(async(req,res) => {
    const {cid} = req.params
    const blogcategory = await blogCategory.findByIdAndDelete(cid)
    return res.status(200).json({
        success: true,
        mes: 'Deleted successfully!!!' ,
        blogcategory
    })
})

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}