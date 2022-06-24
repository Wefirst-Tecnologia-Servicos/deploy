'use strict';

const helper = require("./dao-helper");
const _tableName = "DICTIONARY";

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            helper.getLoadedDataset(_tableName).then(dataset => {
                resolve(dataset);
            });
        });
    },
    getLanguages: () => {
        return new Promise((resolve, reject) => {
            helper.getLoadedDataset(_tableName).then(dataset => {

                var languageCodes = [];

                if (dataset.length > 0) {
                    for (var k in dataset[0]) {
                        if (k && k.length == 2) {
                            languageCodes.push(k.toUpperCase());
                        }
                    }
                }
                resolve(languageCodes);
            });
        });
    }
};