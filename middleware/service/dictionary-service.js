'use strict';

const dao = require('../integration/dictionary-dao');

const getAll = languageID => {
    return new Promise((resolve, reject) => {
        dao.getAll().then(dictionary => {
            var result = {};
            for (var i = 0; i < dictionary.length; i++) {
                result[dictionary[i].dictionaryid.trim()] = {
                    description: dictionary[i][languageID.toLowerCase()],
                    website: dictionary[i].website
                }
            }
            resolve(result);
        });
    });
};

module.exports = {

    getLanguages: languageID => {
        return new Promise((resolve, reject) => {
            getAll(languageID).then(dictionary => {
                dao.getLanguages().then(languageCodes => {
                    var result = {};
                    for (var i = 0; i < languageCodes.length; i++) {
                        result[languageCodes[i]] = dictionary[languageCodes[i]];
                    }
                    for (var k in result) {
                        if (result[k]) {
                            result[k] = result[k].description;
                        }
                    }
                    resolve(result);
                });
            });
        });
    },
    getAll: (website, languageID) => {
        return new Promise((resolve, reject) => {
            getAll(languageID).then(dictionary => {
                var result = {};
                for (var k in dictionary) {
                    if (dictionary[k].website.trim() == website.trim()) {
                        result[k] = dictionary[k].description;
                    }
                }
                resolve(result);
            });
        });
    }
};