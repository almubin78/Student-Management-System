const databaseConnect = require("../config/database.connect");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const StudentCollection = require("../models/StudentModel");
const { json_key_active } = require("../secret");
require('dotenv').config(); // Ensure dotenv is loaded

const handleGetAllStudents = async (req, res) => {
    try {
        await databaseConnect()
        const allStudents = await StudentCollection.find();
        res.json(allStudents);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students' });
    }
};
const handleGetSingleStudents = async (req, res) => {
    try {
        await databaseConnect()
        const {id} =req.params.userId
        const student = await StudentCollection.findOne(id);
        res.json(student);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students' });
    }
};

const handleCreateStudent = async (req, res) => {
    const newStudentCode = req.body.code;
    console.log(req.body,'====req.body');
    console.log(newStudentCode,'===newStudentCode');
    // res.send('hitting')
    const token = createJsonWebToken({newStudentCode,},json_key_active,'24h');
    console.log(token,'this is token ');
    res.send(token);
}





module.exports = {
    handleGetAllStudents,
    handleCreateStudent,
    handleGetSingleStudents
}