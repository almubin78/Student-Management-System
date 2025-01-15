const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: { type: String, required: true }, // Changed from ObjectId to String
    date: { type: String, required: true },
    status: { type: String, enum: ["Present", "Absent"], required: true },
});

const AttendCollection = mongoose.model("attendanceCollection", attendanceSchema);
module.exports = AttendCollection;