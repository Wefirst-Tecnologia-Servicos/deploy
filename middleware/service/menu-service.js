'use strict';

const dao = require('../integration/menu-dao');
const translation = require("./dictionary-service");

module.exports = {

    // builds the treeview menu
    getTreeView: (website, languageID) => {

        return new Promise((resolve, reject) => {

            dao.getAll().then(menuData => {

                // filter the website results
                for (var i = menuData.length - 1; i > -1; i--) {
                    if (menuData[i].website.trim() != website.trim()) {
                        menuData.splice(i, 1);
                    }
                }

                translation.getAll(website, languageID).then(translations => {

                    // translate all menu
                    for (var i = 0; i < menuData.length; i++) {
                        menuData[i].translated_text = translations[menuData[i].text];
                        menuData[i].translated_header = translations[menuData[i].header];
                    }

                    // recursive function to load children
                    var loadChildrenMenu = rootMenuItem => {
                        rootMenuItem.children = [];
                        for (var i = 0; i < menuData.length; i++) {
                            if (menuData[i].fathermenuid == rootMenuItem.menuid) {
                                rootMenuItem.children.push(menuData[i]);
                                loadChildrenMenu(menuData[i]);
                            }
                        }
                    };

                    // returns the full treeView
                    var treeView = { menuid: null };
                    loadChildrenMenu(treeView)
                    resolve(treeView);
                });
            });
        });
    }
};
