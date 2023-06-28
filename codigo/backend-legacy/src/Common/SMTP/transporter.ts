import { smtpConfig } from './SMTPconfig';
import nodemailer from 'nodemailer';

//Envia o email ao usuário
export const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})