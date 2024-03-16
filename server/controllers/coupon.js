const { response } = require('express')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async(req,res) => {
    const {title, discount, expiry} = req.body
    if(!title || !discount || !expiry) throw new Error('Missing inputs')
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    })
    return res.json({
        success: response? true:false,
        data: response? response: 'sai roi'
    })
})

const getCoupons = asyncHandler(async(req,res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    return res.json({
        success: response? true:false,
        response
    })  
})

const updateCoupon = asyncHandler(async(req,res)=>{
    const {cid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 *1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, {new: true})
    return res.json({
        success: response? true:false,
        data:response? response:'loi'
    })
})

const deleteCoupon = asyncHandler(async(req,res)=>{
    const {cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.json({
        success: response? true:false,
        data:response? response:'loi'
    })
})

module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon
}