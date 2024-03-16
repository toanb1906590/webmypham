const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req,res) => {
    const brand = await Brand.create(req.body)
    return res.status(200).json({
        success: true,
        brand
    })
})

const getBrands = asyncHandler (async(req,res) => {
    const brand = await Brand.find()
    return res.status(200).json({
        success: true,
        brand
    })
})

const updateBrand = asyncHandler(async(req,res) => {
    const {cid} = req.params
    const brand = await Brand.findByIdAndUpdate(cid, req.body, {new: true})
    return res.status(200).json({
        success: true,
        brand
    })
})

const deleteBrand = asyncHandler(async(req,res) => {
    const {cid} = req.params
    const brand = await Brand.findByIdAndDelete(cid)
    return res.status(200).json({
        success: true,
        mes: 'Deleted successfully!!!' ,
        brand
    })
})

module.exports = {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand
}