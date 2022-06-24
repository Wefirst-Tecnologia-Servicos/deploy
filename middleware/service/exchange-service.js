'use strict';

const https = require('https');

function getRates(baseCurrency) {
    return new Promise((resolve, reject) => {
        try {
            https.get(`https://api.exchangerate.host/latest?base=${baseCurrency}`, res => {
                let data = [];
                res.on('data', chunk => {
                    data.push(chunk);
                });
                res.on('end', () => {
                    const body = Buffer.concat(data).toString();
                    resolve(JSON.parse(body).rates);
                });
                res.on('error', err => {
                    reject(err);
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    convert: (value, fromCurrency, toCurrency) => {
        return new Promise((resolve, reject) => {
            getRates(fromCurrency).then(exchangeRates => {
                try {
                    resolve({
                        FromCurrency: fromCurrency,
                        FromValue: value,
                        ToCurrency: toCurrency,
                        ToValue: value * exchangeRates[toCurrency]
                    });
                } catch (err) {
                    reject(err);
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
    getRates: getRates
}