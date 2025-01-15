const mongoose = require("mongoose");

const MonthSchema = new mongoose.Schema({
    
    examResult: {
        type: Map,
        of: Number, // Keys as integers, values as scores
    },
    presentStatus: {
        type: [Boolean], // Array of attendance statuses
    },
});

const RecordSchema = new mongoose.Schema({
    studentCode: {
        type: String,
        required: true,
    },
    year:{
        type: String,
        default: 2025,
    },
    month: {
        type: Map,
        of: MonthSchema,
        default: {},
    },
    previousStatus: {
        totalDays: {
            type: Number,
            default: 0,
        },
        totalPresent: {
            type: Number,
            default: 0,
        },
        totalPay: {
            type: Number,
            default: 0,
        },
        duePay: {
            type: Number,
            default: 0,
        },
        totalCost: {
            type: Number,
            default: 0,
        },
    },
});

const RecordCollection = mongoose.model("RecordCollection", RecordSchema);
module.exports = RecordCollection;
