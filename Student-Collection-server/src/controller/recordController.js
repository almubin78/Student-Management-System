const RecordCollection = require("../models/RecordModel");
// const StudentCollection = require("../models/StudentModel");


// Fetch all records
const getRecords = async (req, res) => {
  try {
    // const records = await RecordCollection.find();
    const records = RecordCollection.find();
    // const allStudents = await StudentCollection.find();
    res.status(200).json({records});
  } catch (error) {
    res.status(500).json({ error: "Error fetching records" });
  }
};

// Update exam results or attendance
const updateMonthData = async (req, res) => {
  const { studentCode, month, field, data } = req.body;

  try {
    const record = await RecordCollection.findOne({ studentCode });
    if (!record) return res.status(404).json({ error: "Record not found" });

    // Update specific month and field (examResult or presentStatus)
    record.month.set(`${month}.${field}`, data);

    await record.save();
    res.status(200).json({ message: "Month data updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating month data" });
  }
};

// Automatically create month entry
const createMonthData = async () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" }).toLowerCase();
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toLocaleString("default", { month: "long" })
    .toLowerCase();

  try {
    const records = await RecordCollection.find();

    records.forEach((record) => {
      if (!record.month.has(lastMonth)) {
        record.month.set(lastMonth, { examResult: {}, presentStatus: [] });
        record.save();
      }
    });
    console.log("Monthly data created successfully!", currentMonth, lastMonth);
  } catch (error) {
    console.error("Error creating monthly data:", error);
  }
};
const addRecord = async (req, res) => {
  const { studentCode, month, previousStatus } = req.body;

  try {
    // Check if the record already exists
    const existingRecord = await RecordCollection.findOne({ studentCode });

    if (existingRecord) {
      return res.status(400).json({ message: "Record already exists for this student." });
    }

    // Create a new record
    const newRecord = new RecordCollection({
      studentCode,
      month,
      previousStatus,
    });

    await newRecord.save();

    res.status(201).json({ message: "Record added successfully!", data: newRecord });
  } catch (error) {
    console.error("Error adding record:", error);
    res.status(500).json({ error: "Failed to add record." });
  }
}
// setInterval(createMonthData, 60 * 1000);//// 60,000ms = 1 minute

module.exports = {
  addRecord,
  getRecords,
  updateMonthData,
  createMonthData
};
