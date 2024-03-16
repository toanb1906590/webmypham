const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler ( async ({email, html, subject}) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"cuahangmypham" <no-reply@cuahangmypham.com>',
        to: email,
        subject: subject,
        html: html,
    });

    return info;
});

module.exports = { 
    sendMail
};
