const express = require("express");
const router = express.Router();
const service = require("../../middleware/service/exchange-service");

router.get("/exchange/rates/:baseCurrency", (request, response) => {
    try {
        const baseCurrency = request.params["baseCurrency"];
        if (!baseCurrency) {
            response.status(400).send('Missing parameters. You must send baseCurrency.');
        } else {
            service.getRates(baseCurrency).then(rates => {
                response.status(200).send(rates);
            }).catch(error => {
                console.log(error);
                response.status(500).send('Internal Server Error');
            });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
});

router.post("/exchange/convert/", (request, response) => {
    try {
        const conversionModel = {
            FromCurrency: request.body.FromCurrency,
            FromValue: request.body.FromValue,
            ToCurrency: request.body.ToCurrency
        };

        if (!conversionModel.FromCurrency ||
            !conversionModel.FromValue ||
            !conversionModel.ToCurrency ||
            conversionModel.FromCurrency.length != 3 ||
            conversionModel.ToCurrency.length != 3 ||
            conversionModel.FromValue == "" ||
            isNaN(conversionModel.FromValue)) {

            response.status(400).send('Incorrect Parameters');

        } else {
            service.convert(conversionModel.FromValue,
                            conversionModel.FromCurrency, 
                            conversionModel.ToCurrency).then(conversionResult => {

                response.status(200).send(conversionResult);

            }).catch(err => {

                console.log(err);
                response.status(500).send('Internal Server Error');

            });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }

});

module.exports = router;