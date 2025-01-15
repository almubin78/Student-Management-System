const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    writerName:{
        type:String,
        required:[true,'তোমার নাম লিখ।'],

    },
    contactNumber:Number,
    text:{
        type:String,
        required:[true,'মেসেজ ফাঁকা। ']
    }

})
const MessageCollection = mongoose.model('MessagesCollection',MessageSchema);

module.exports = MessageCollection;