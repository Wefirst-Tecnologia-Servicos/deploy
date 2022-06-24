'use strict';

const config = require('./config.json');
const email = require('../common/email-helper');

module.exports = {
    send: model => {

        // get the e-mail info
        const mailConfig = config[doubtsModel.WebSite].email[model.MailType];
        var subject = mailConfig.template.subject;
        var text = mailConfig.template.text;
        var html = mailConfig.template.html;

        // bind the model data into the template e-mail data
        for (var k in model) {
            while (subject.indexOf(`${k}`) > -1) {
                subject = subject.replace(`${k}`, model[k]);
            }
            while (text.indexOf(`${k}`) > -1) {
                text = text.replace(`${k}`, model[k]);
            }
            while (html.indexOf(`${k}`) > -1) {
                html = html.replace(`${k}`, model[k]);
            }
        }

        // send the e-mail
        return email.send(mailConfig.sendGrid.apiKey,
                          mailConfig.sendGrid.sender,
                          mailConfig.sendGrid.recipient,
                          subject, text, html);
    }
};