"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class mailController {
    async sendMail(req, res) {
        const mail = req.body.email;
        console.log(req.body.email + " " + "body");
        console.log(mail + " " + "mail");
        let testAccount = await nodemailer_1.default.createTestAccount();
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'ander.rdvcarbajo@gmail.com',
                pass: 'vvkqwembjrkhppar', // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"CertiDeusto" <ander.rdvcarbajo@gmail.com>',
            to: mail,
            subject: "Account Accepted ✔",
            text: "Hello, Your Acount Has Been Accepted You are now able to log in",
            html: "<b>Hello, Your Account Has Been Accepted.</b> <br> <br> <b>You are now able to log in.</b> ", // html body
        });
    }
    async sendMailRejection(req, res) {
        const mail = req.body.email;
        console.log(req.body.email + " " + "body");
        console.log(mail + " " + "mail");
        let testAccount = await nodemailer_1.default.createTestAccount();
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'ander.rdvcarbajo@gmail.com',
                pass: 'vvkqwembjrkhppar', // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"CertiDeusto" <ander.rdvcarbajo@gmail.com>',
            to: mail,
            subject: "Account Rejected ✖",
            text: "Hello, Your Account Has Been Rejected For more information send an email to contact@certideusto.es",
            html: "<b>Hello, Your Account Has Been Rejected.</b> <br> <br> <b>For more information send an email to contact@certideusto.es</b>", // html body
        });
    }
}
exports.MailController = new mailController();
