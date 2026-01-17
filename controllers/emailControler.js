const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler');
const { model } = require('mongoose');


const sendEmail = asyncHandler(async(data,req,res)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASS,
        },
      });
      
        let info = await transporter.sendMail({
          from: '"Hello 👻" <abc@example.com>',
          to: data.to,
          subject: data.subject,
          text: data.text,
          html: data.html,
        });
      
        console.log("Message sent: %s", info.messageId);   
      
      main().catch(console.error);
})











module.exports = sendEmail ; 