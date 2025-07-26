// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use SMTP settings for your service
  auth: {
    user: 'anasmohamad369@gmail.com',
    pass: 'icbcisxzmrgzuuiv',  // Use App Passwords if 2FA is enabled
  },
  
});

module.exports = transporter;
