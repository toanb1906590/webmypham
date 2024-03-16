const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length == 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        created: newProduct ? newProduct : 'Cannot created product'
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await Product.findById(pid)
    return res.status(200).json({
        success: response ? true : false,
        product: response ? response : 'Product not found'
    })
})

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);

    // Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
    const formattedQueries = JSON.parse(queryString);

    // Filter 
    if (queries?.title) formattedQueries.title = { $regex: queries.title, $options: 'i' };

    // Query Command
    let queryCommand = Product.find(formattedQueries);

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    //Pagination
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    //Tính toán skip để phục vụ phân trang
    const skip = (page - 1) * limit

    //Query Command
    queryCommand = queryCommand.skip(skip).limit(limit)

    // Execute query
    const response = await queryCommand.exec();

    // Đếm số lượng tài nguyên
    const counts = await Product.countDocuments(formattedQueries);

    return res.status(200).json({
        success: response ? true : false,
        counts,
        product: response ? response : 'Cannot get product'
    });
});



const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Update successfuly!!' : 'Product not found'
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Deleted successfuly!!' : 'Product not found'
    })
})

const Rating = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid } = req.body
    if (!star || !pid) throw new Error('Missing inputs')
    const rating = await Product.findById(pid)
    const alreadyRating = rating?.ratings?.find(el => el.postedBy.toString() === _id)

    if (alreadyRating) {
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment }
        }, { new: true })
    } else {
        const response = await Product.findByIdAndUpdate(pid, { $push: { ratings: { star, comment, postedBy: _id } } }, { new: true })
    }

    const updateProduct = await Product.findById(pid)
    const ratingcount = updateProduct.ratings.length
    const sumrating = updateProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updateProduct.totalRatings = Math.round(sumrating / ratingcount)

    await updateProduct.save()

    return res.status(200).json({
        status: true,
        updateProduct
    })
})

const uploadImageProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if(!req.files) throw new Error('Missing inputs')
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(el => el.path)}}}, {new: true})
    await response.save()
    return res.json({
        status: response? true:false,
        updateProduct: response? response:'Cannot upload images'
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    Rating,
    uploadImageProduct
}