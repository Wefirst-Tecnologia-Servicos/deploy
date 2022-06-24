'use strict';

const sgMail = require('@sendgrid/mail');

module.exports = {
    send: (apiKey, from, to, subject, text, html) => {
        sgMail.setApiKey(apiKey);
        return sgMail.send({
            to: to,
            from: from,
            subject: subject,
            text: text,
            html: html
        })
    }
};