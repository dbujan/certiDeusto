import {Request, Response} from 'express';
import nodemailer from 'nodemailer';

class mailController{
    public async sendMail(req: Request,res: Response) {
        const mail = req.body.email;
        console.log(req.body.email + " " + "body");
        console.log(mail     + " " + "mail");
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: 'ander.rdvcarbajo@gmail.com', // generated ethereal user
              pass: 'vvkqwembjrkhppar', // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"CertiDeusto" <ander.rdvcarbajo@gmail.com>', // sender address
            to: mail, // list of receivers
            subject: "Account Accepted ✔", // Subject line
            text: "Hello, Your Acount Has Been Accepted You are now able to log in", // plain text body
            html: "<b>Hello, Your Account Has Been Accepted.</b> <br> <br> <b>You are now able to log in.</b> ", // html body
          });
    }
    public async sendMailRejection(req: Request,res: Response) {
      const mail = req.body.email;
        console.log(req.body.email + " " + "body");
        console.log(mail     + " " + "mail");
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: 'ander.rdvcarbajo@gmail.com', // generated ethereal user
              pass: 'vvkqwembjrkhppar', // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"CertiDeusto" <ander.rdvcarbajo@gmail.com>', // sender address
            to: mail, // list of receivers
            subject: "Account Rejected ✖", // Subject line
            text: "Hello, Your Account Has Been Rejected For more information send an email to contact@certideusto.es", // plain text body
            html: "<b>Hello, Your Account Has Been Rejected.</b> <br> <br> <b>For more information send an email to contact@certideusto.es</b>", // html body
          });
    }
}

export const MailController = new mailController();