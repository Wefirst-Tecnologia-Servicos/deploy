'use strict';

const express = require("express");
const router = express.Router();
const service = require("../../middleware/service/menu-service");

router.post("/menu/", (request, response) => {

    try {
        const menuModel = {
            Website: request.body.Website,
            LanguageID: request.body.LanguageID
        };

        if (!menuModel.Website || !menuModel.LanguageID) {
            response.status(400).send('Incorrect Parameters');
        } else {
            service.getTreeView(menuModel.Website, menuModel.LanguageID).then(menuTree => {
                response.status(200).send(menuTree);
            });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
});

module.exports = router;