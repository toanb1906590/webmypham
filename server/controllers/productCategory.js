const productCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req,res) => {
    const category = await productCategory.create(req.body)
    return res.status(200).json({
        success: true,
        category
    })
})

const getCategory = asyncHandler (async(req,res) => {
    const category = await productCategory.find()
    return res.status(200).json({
        success: true,
        category
    })
})

const updateCategory = asyncHandler(async(req,res) => {
    const {cid} = req.params
    const category = await productCategory.findByIdAndUpdate(cid, req.body, {new: true})
    return res.status(200).json({
        success: true,
        category
    })
})

const deleteCategory = asyncHandler(async(req,res) => {
    const {cid} = req.params
    const category = await productCategory.findByIdAndDelete(cid)
    return res.status(200).json({
        success: true,
        mes: 'Deleted successfully!!!' ,
        category
    })
})

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}