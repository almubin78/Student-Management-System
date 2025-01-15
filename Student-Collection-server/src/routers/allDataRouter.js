const express = require('express');
const { getAllMessages } = require('../controller/message.controller');
const handleDataController = require('../controller/alldataController');
const allDataRouter = express.Router();

allDataRouter.get('/all-data',handleDataController)

module.exports = allDataRouter;
