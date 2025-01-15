const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    studentName: String,
    code: String,
    fathersName: String,
    mothersName: String,
    joinDate: String,
    sheetFeeStatus: String,
    monthlyFeeStatus: String,
    behaviour: String,
    class: String,
    schoolName: String,
    schoolRoll: String,
    gender: String,
    phoneNumber: Number,
    password: String,
    roll: { type: String, default: 'student' } // New field with a default value
})

const StudentCollection = mongoose.model('studentcollections', StudentSchema);
module.exports = StudentCollection;