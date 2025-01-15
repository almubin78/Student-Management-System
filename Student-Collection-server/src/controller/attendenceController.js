
const AttendCollection = require("../models/AttendenceModel");
const StudentCollection = require("../models/StudentModel");

// const handlePostAttend = async (req, res) => {
//     const attendanceRecords = req.body;

//     try {
//         // Validate and save attendance records
//         const validRecords = attendanceRecords.map(record => ({
//             studentId: record.studentId,
//             date: record.date,
//             status: record.status
//         }));

//         // Save all records in bulk
//         await AttendCollection.insertMany(validRecords);

//         // await attendanceRecords.save()
//         res.status(201).json({ message: "Attendance records saved successfully." });
//     } catch (error) {
//         console.error("Error saving attendance records:", error);
//         res.status(500).json({ error: "Failed to save attendance records." });
//     }
// };

// const handlePostAttend = async (req, res) => {
//     const attendanceRecords = req.body;
//     console.log(attendanceRecords,'attendancerecords');
//     try {
//         // Check if attendanceRecords is provided and is an array
//         if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
//             return res.status(400).json({ error: "Invalid attendance records provided." });
//         }

//         // Validate and transform attendance records
//         const validRecords = attendanceRecords.map(record => {
//             if (!record.studentId || !record.date || !record.status) {
//                 throw new Error("Each record must include studentId, date, and status.");
//             }
//             return {
//                 studentId: record.studentId,
//                 date: record.date,
//                 status: record.status,
//             };
//         });

//         console.log(validRecords,'valid records');

//         // Save all records in bulk
//         const insertingValidRecord = await AttendCollection.insertMany(validRecords);

//         res.status(201).json({ message: "Attendance records saved successfully.",insertingValidRecord });
//     } catch (error) {
//         console.error("Error saving attendance records:", error.message);

//         // Distinguish between validation errors and other errors
//         if (error.message.includes("Each record must include")) {
//             return res.status(400).json({ error: error.message });
//         }

//         res.status(500).json({ error: "Failed to save attendance records." });
//     }
// };

const handlePostAttend = async (req, res) => {
    const attendanceRecords = req.body;
    console.log(attendanceRecords, "attendancerecords");

    try {
        // Check if attendanceRecords is provided and is an array
        if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
            return res.status(400).json({ error: "Invalid attendance records provided." });
        }

        // Validate and transform attendance records
        const validRecords = attendanceRecords.map((record) => {
            if (!record.studentId || !record.date || !record.status) {
                throw new Error("Each record must include studentId, date, and status.");
            }
            return {
                studentId: record.studentId,
                date: record.date,
                status: record.status,
            };
        });

        // console.log(validRecords, "valid records");

        // Check for duplicates in the database
        const existingRecords = await AttendCollection.find({
            $or: validRecords.map((record) => ({
                studentId: record.studentId,
                date: record.date,
            })),
        });
        console.log(existingRecords,'===existingRecords');

        const existingKeys = new Set(
            existingRecords.map((record) => `${record.studentId}-${record.date}`)
        );
        console.log(existingKeys,'===existingKeys');
        // Filter out duplicates
        const newRecords = validRecords.filter(
            (record) => !existingKeys.has(`${record.studentId}-${record.date}`)
        );
        console.log(newRecords,'====newRecords');
        if (newRecords.length === 0) {
            return res
                .status(400)
                .json({ error: "All provided attendance records already exist." });
        }

        console.log(newRecords, "new records to insert");

        // Save all new records in bulk
        const insertingValidRecord = await AttendCollection.insertMany(newRecords);

        res.status(201).json({
            message: "Attendance records saved successfully.",
            insertedRecords: insertingValidRecord,
        });
    } catch (error) {
        console.error("Error saving attendance records:", error.message);

        // Distinguish between validation errors and other errors
        if (error.message.includes("Each record must include")) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: "Failed to save attendance records." });
    }
};

const handleGetAttend = async (req, res) => {
    const { date } = req.query;
    // console.log(req.body);
    if (!date) {
        return res.status(400).json({ error: "Date parameter is required." });
    }

    try {
        // Fetch all students
        const students = await StudentCollection.find().select("code studentName imgLink");
        // const students = await StudentCollection.find().select("code studentName imgLink");
        console.log(students,'===students in get attend');
        // Fetch attendance records for the given date
        const attendanceRecords = await AttendCollection.find({ date });
        console.log(attendanceRecords,'===attendanceRecords in get attend');

        res.status(200).json({
            students,
            attendance: attendanceRecords,
        });
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: "Failed to fetch attendance records." });
    }
}
const handleUpdateAttendance = async (req, res) => {
    const { studentId, date, status } = req.body;

    // Validate the request payload
    if (!studentId || !date || !status) {
        return res.status(400).json({ error: "Missing required fields: studentId, date, or status." });
    }

    try {
        // Find and update the record
        const updatedRecord = await AttendCollection.findOneAndUpdate(
            { studentId, date }, // Filter condition
            { status }, // Fields to update
            { new: true, upsert: false } // Options: return the updated document, don't create new
        );

        if (!updatedRecord) {
            return res.status(404).json({ error: "Attendance record not found for the given studentId and date." });
        }

        res.status(200).json({
            message: "Attendance updated successfully.",
            updatedRecord,
        });
    } catch (error) {
        console.error("Error updating attendance:", error.message);
        res.status(500).json({ error: "Failed to update attendance." });
    }
};

module.exports = {
    handlePostAttend,
    handleGetAttend,
    handleUpdateAttendance
};