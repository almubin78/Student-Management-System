const MessageCollection = require("../models/MessageModel");
const { successController } = require("./responseController");

const getAllMessages = async (req, res, next) => {
    try {
        const messages = await MessageCollection.find();
        console.log(messages);
        successController(res,{
            payload:messages,
            sendFrom:'getAllMessages controller'
        })
    } catch (error) {

    }
}
const PostMassage = async (req, res, next) => {
    try {
        const message = req.body;
        const newMessage = new MessageCollection(message);
        const saveMessage = await newMessage.save()
        // console.log(message);
        successController(res, {
            payload: saveMessage, sendFrom: 'post message controller'
        });

        

    } catch (error) {

    }
}

module.exports = {
    PostMassage,
    getAllMessages
}