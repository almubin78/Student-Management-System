const databaseConnect = require("../config/database.connect");
const AttendCollection = require("../models/AttendenceModel");
const MessageCollection = require("../models/MessageModel");
const RecordCollection = require("../models/RecordModel");
const StudentCollection = require("../models/StudentModel");

const handleDataController = async(req,res,next)=>{
    databaseConnect();
    const records = await RecordCollection.find();
    const allStudents = await StudentCollection.find(); 
    const messages = await MessageCollection.find(); 
    const attendance = await AttendCollection.find(); 
    return res.status(200).json({records,allStudents,messages,attendance})
}
module.exports = handleDataController;