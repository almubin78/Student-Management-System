const RecordCollection = require("../models/RecordModel");
const StudentCollection = require("../models/StudentModel");

const handleAddSomethingToAll = async (req, res) => {
    try {
        // Update documents where the `roll` field does not exist
        // const updateResult = await StudentCollection.updateMany({ roll: { $exists: false } });
        const updateResult = await RecordCollection.updateMany(
            { year: { $exists: false } }, 
            { $set: { year: "2025" } } 
        );

        const modifiedCount = updateResult.modifiedCount || updateResult.nModified || 0;
        // Send a response back with the number of modified documents
        res.json({
            message: `${modifiedCount} students updated successfully.`,updateResult
            
        });
    } catch (error) {
        console.error('Error updating students:', error);
        res.status(500).json({ message: 'Error updating students' });
    }
};
module.exports = handleAddSomethingToAll;
