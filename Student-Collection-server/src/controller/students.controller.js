const { createJsonWebToken } = require("../helper/jsonWebToken");
const StudentCollection = require("../models/StudentModel");
const { json_key_active } = require("../secret");
require('dotenv').config(); // Ensure dotenv is loaded

// const databaseUrl = process.env.MONGODB_DRIVER_URL;
// const handleGetAllStudents = async (req, res) => {
//     try {
//         const allStudents = await StudentCollection.find();
//         if (allStudents.length === 0) {
//             console.log('No students found.');
//         } else {
//             // console.log('Students:', allStudents);
//         }
//         res.json(allStudents);
//     } catch (error) {
//         // console.error('Error fetching students:', error);
//         res.status(500).json({ message: 'Error fetching students' });
//     }
// };
const handleGetAllStudents = async (req, res) => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_DRIVER_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        }
        const allStudents = await StudentCollection.find();
        res.json(allStudents);
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
}