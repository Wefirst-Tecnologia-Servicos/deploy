'use strict';

const helper = require("./dao-helper");
const _tableName = "MENU";

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            helper.getLoadedDataset(_tableName).then(dataset => {
                resolve(dataset);
            });
        });
    }
};