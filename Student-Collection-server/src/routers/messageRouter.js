const express = require('express');
const { PostMassage, getAllMessages } = require('../controller/message.controller');
const MessageRouter = express.Router();

MessageRouter.post('/postMessage',PostMassage);
MessageRouter.get('/allMessages',getAllMessages);

module.exports = MessageRouter;