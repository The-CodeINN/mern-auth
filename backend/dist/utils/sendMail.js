"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const resend_1 = require("../config/resend");
const env_1 = require("../constants/env");
const getFromEmail = () => env_1.NODE_ENV === 'development' ? 'onboarding@resend.dev' : 'EMAIL_SENDER';
const getToEmail = (to) => env_1.NODE_ENV === 'development' ? 'deliverd@resend.dev' : to;
const sendMail = async ({ to, subject, text, html }) => await resend_1.resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
});
exports.sendMail = sendMail;
