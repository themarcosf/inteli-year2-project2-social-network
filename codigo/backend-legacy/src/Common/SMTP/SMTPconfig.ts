require('dotenv').config();

export const smtpConfig = {
    host: "smtp.gmail.com",
    port: 587,
    user: "noreplydellprojects@gmail.com",
    pass: process.env.PASSWORD_GMAIL_NODEMAILER
}