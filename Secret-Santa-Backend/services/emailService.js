const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

async function sendEmail(email, emailSubject, emailHTML) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: emailSubject,
        html: emailHTML
      });
}

module.exports = { sendEmail };