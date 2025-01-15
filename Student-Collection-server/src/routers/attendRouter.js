const express = require('express');
const { handlePostAttend, handleGetAttend, handleUpdateAttendance } = require('../controller/attendenceController');
const AttendRouter = express.Router();

AttendRouter.post('/save',handlePostAttend);
AttendRouter.get("/records", handleGetAttend);
AttendRouter.get("/update", handleUpdateAttendance);

module.exports = AttendRouter;