const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../ultils/sendMail')
const crypto = require('crypto')
const makeToken = require('uniqid')
const { param } = require('../routes/user')

// const register = asyncHandler(async (req, res) => {
//     const { email, password, firstname, lastname } = req.body
//     if (!email || !password || !firstname || !lastname) {
//         return res.status(400).json({
//             success: false,
//             mes: 'Missing inputs'
//         })
//     }
//     const user = await User.findOne({ email })
//     if (user) {
//         throw new Error('User has existed')
//     } else {
//         const newuser = await User.create(req.body)
//         return res.status(200).json({
//             success: newuser ? true : false,
//             mes: newuser ? 'register successful' : 'register not successful'
//         })
//     }
// })

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !firstname || !lastname || !mobile) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        });
    }
    const user = await User.findOne({ email })
    if (user) {
        throw new Error('User has existed')
    } else {
        const token = makeToken();
        res.cookie('dataregister', { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký. Link sẽ hết hạn sau 5 phút kể từ bây giờ.
        <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click Here</a>`;
        await sendMail({ email, html, subject: 'Hoàn tất đăng ký' });
        return res.json({
            success: true,
            mes: 'Vui lòng kiểm tra email để hoàn tất các bước đăng ký'
        });
    }

});

const finalregister = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    const { token } = req.params
    if (!cookie || cookie?.dataregister?.token !== token) {
        res.clearCookie('dataregister')
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    }
    const newUser = await User.create({
        email: cookie?.dataregister?.email,
        password: cookie?.dataregister?.password,
        firstname: cookie?.dataregister?.firstname,
        lastname: cookie?.dataregister?.lastname,
        mobile: cookie?.dataregister?.mobile
    })

    res.clearCookie('dataregister')
    if (newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
})



const getone = asyncHandler(async (req, res) => {
    const { email } = req.body
    const response = await User.findOne({ email })
    console.log(response)
    return res.status(200).json({
        success: response ? true : false,
        response
    })
})

const update = asyncHandler(async (req, res) => {
    const { useremail, ...data } = req.body;

    // Sử dụng findOne với điều kiện để tìm kiếm useremail
    const filter = { email: useremail };

    // Băm lại mật khẩu mới nếu có
    if (data.password) {
        // Bạn cần sử dụng bcrypt hoặc một thư viện băm mật khẩu tương tự
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // Thêm hashedPassword vào updateFields
        data.password = hashedPassword;
    }

    const update = {
        $set: data
    };

    const options = { new: true }; // Trả về bản ghi đã được cập nhật

    // Gọi findOneAndUpdate trực tiếp trên mô hình User
    const updatedUser = await User.findOneAndUpdate(filter, update, options);

    if (!updatedUser) {
        return res.status(400).json({
            success: false,
            mes: 'Undefined useremail'
        });
    }

    return res.status(200).json({
        success: true,
        updatedUser: updatedUser
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userdata } = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const newrefreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, { refreshToken: newrefreshToken }, { new: true })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userdata
        })
    } else {
        throw new Error('Invalid credentials!')
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-password -role -refreshToken')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh Token in cookie')
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? generateAccessToken(response._id, response.role) : 'refresh token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        throw new Error('No refresh token in cookies');
    }

    // Tìm và cập nhật người dùng có refreshToken tương ứng
    const user = await User.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: '' }, { new: true });

    // Xóa cookie refreshToken
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json({
        success: true,
        mes: 'Logout successful!'
    });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const resetToken = await user.createPasswordchangedToken()
    await user.save()
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href="${process.env.CLIENT_URL}/resetpassword/${resetToken}">Click here</a>`

    const data = {
        email,
        html,
        subject: 'Forgot password'
    }

    const rs = await sendMail(data)
    return res.status(200).json({
        success: rs.response.includes('OK') ? true : false,
        mes: rs.response.includes('OK') ? 'Hãy check mail của bạn.' : 'Đã có lỗi. Vui lòng thử lại sau.'
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password successful' : 'Something went wrong'
    })
})

const getUser = asyncHandler(async (req, res) => {
    const response = await User.find().select('-role -password -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        response
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? `Deleted user ${response.email}` : 'No user deleted'
    })
})

const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate({ _id }, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: true,
        response
    })
})

const updatedUserisAdmin = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate({ _id }, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: true,
        response
    })
})

const updateUserAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!req.body.address) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, { address: req.body.address }, { new: true }).select('-role -password -refreshToken')
    return res.json({
        status: response ? true : false,
        userAddress: response ? response : 'loi'
    })
})

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, color, quantity } = req.body
    if (!pid || !color || !quantity) throw new Error('Missing inputs')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid && el.color.toString() === color)
    if (alreadyProduct) {
        const response = await User.updateOne({ cart: { $elemMatch: alreadyProduct } }, { $set: { "cart.$.quantity": quantity } }, { new: true })
        return res.json({
            status: response ? true : false,
            product: response ? response : 'loi'
        })
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            product: response ? response : 'loi'
        })
    }
})

const getCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id)
    console.log(user)
    return res.json({
        status: user ? true : false,
        data: user ? user : 'loi'
    })

})


module.exports = {
    register,
    finalregister,
    update,
    getone,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUser,
    deleteUser,
    updatedUser,
    updatedUserisAdmin,
    updateUserAddress,
    updateCart,
    getCart
} 