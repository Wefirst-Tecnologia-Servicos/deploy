const express = require("express");
const router = express.Router();
const service = require("../../middleware/service/dictionary-service");

router.get("/dictionary/languages/:languageID", (request, response) => {
    try {
        const languageID = request.params["languageID"];
        if (!languageID) {
            response.status(400).send('Missing parameters. You must send languageID.');
        } else {
            service.getLanguages(languageID).then((languages) => {
                response.status(200).send(languages);
            });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
});

router.post("/dictionary", (request, response) => {
    try {
        const dictionaryModel = {
            Website: request.body.Website,
            LanguageID: request.body.LanguageID
        };

        if (!dictionaryModel.Website || !dictionaryModel.LanguageID) {
            response.status(400).send('Incorrect Parameters');
        } else {
            service.getAll(request.body.Website, dictionaryModel.LanguageID).then(translations => {
                response.status(200).send(translations);
            });
        }
        
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
});

module.exports = router;