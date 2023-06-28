"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const SMTPconfig_1 = require("./SMTPconfig");
const nodemailer_1 = require("nodemailer");
exports.transporter = nodemailer_1.default.createTransport({
    host: SMTPconfig_1.smtpConfig.host,
    port: SMTPconfig_1.smtpConfig.port,
    secure: false,
    auth: {
        user: SMTPconfig_1.smtpConfig.user,
        pass: SMTPconfig_1.smtpConfig.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=transporter.js.map