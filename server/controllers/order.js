const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async(req,res) => {
    const {_id} = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color
    }))
    let total = userCart?.cart?.reduce((sum,el) => el.product.price * el.quantity + sum, 0)
    const createData = {products, total, orderBy: _id}
    if(coupon) {
        const coupons = await Coupon.findById(coupon)
        total = Math.round(total * (1 - +coupons?.discount/100)) || total
        createData.total = total
        createData.coupon = coupon
    }
    console.log(total)
    const response = await Order.create(createData)
    return res.json({
        status: response? true:false,
        order: response? response:'loi'     
    })
})

const updateStatus = asyncHandler(async(req,res) => {
    const {oid} = req.params
    const {status} = req.body
    if(!status) throw new Error('Missing inputs')
    const response = await Order.findByIdAndUpdate(oid, {status}, {new : true})
    return res.json({
        status: response? true:false,
        order: response? response:'loi'     
    })
})

const getOrder = asyncHandler(async(req,res) => {
    const {_id} = req.user
    const response = await Order.find({orderBy: _id})
    const count = await Order.countDocuments({orderBy: _id})
    return res.json({
        success: response? true:false,
        count: count,
        rs: response? response:'loi'
    })
})

const getOrders = asyncHandler(async(req,res) => {
    const count = await Order.countDocuments()
    const response = await Order.find()
    return res.json({
        success: response? true:false,
        count: count,
        rs: response? response:'loi'
    })
})

module.exports = {
    createOrder,
    updateStatus,
    getOrder,
    getOrders
}