"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtpConfig = void 0;
require('dotenv').config();
exports.smtpConfig = {
    host: "smtp.gmail.com",
    port: 587,
    user: "noreplydellprojects@gmail.com",
    pass: process.env.PASSWORD_GMAIL_NODEMAILER
};
//# sourceMappingURL=SMTPconfig.js.map