const express = require("express");
const router = express.Router();
const service = require("../../Middleware/service/email-service");

router.post("/email", (request, response) => {
    try {
        const mailModel = {
            To: request.body.To,
            Subject: request.body.Subject,
            MailText: request.body.MailText,
            MailHTML: request.body.MailHTML,
            Attachments: request.body.Attachments // [{filename: 'Report.pdf', content: Base64data}]
        };

        console.log("Calling email-service...");
        service.send(mailModel).then(() => {
            response.status(200).send('{ "status": "OK" }');
        }).catch((err) => {
            try {
                response.status(400).send(err.response.body.errors);
            } catch {
                response.status(400).send(err.response);
            }
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
});

module.exports = router;