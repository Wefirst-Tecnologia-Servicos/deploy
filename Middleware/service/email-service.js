'use strict';

const config = require('./config.json');
const sgMail = require('@sendgrid/mail');

module.exports = {
    send: (mailModel) => {
        console.log("Defining API Key...");
        sgMail.setApiKey(config.eMail.sendGrid.apiKey);
        console.log("Calling SendGrid send method...");

        if (!mailModel.Attachments) mailModel.Attachments = [];

        return sgMail.send({
            to: mailModel.To,
            from: config.eMail.sendGrid.sender,
            subject: mailModel.Subject,
            text: mailModel.MailText,
            html: mailModel.MailHTML,
            attachments: mailModel.Attachments
        });
    }
};