const express = require("express");
const { getRecords, updateMonthData, addRecord } = require("../controller/recordController");
const handleAddSomethingToAll = require("../controller/AddAnyKeyValueForAll.Controller");


const recordRouter = express.Router();

// Get all records
recordRouter.get("/get-record", getRecords);
//add a record
recordRouter.post("/add-record", addRecord);

// Update month data (examResult or presentStatus)
recordRouter.put("/update", updateMonthData);
recordRouter.post("/add-property", handleAddSomethingToAll);


module.exports = recordRouter;
