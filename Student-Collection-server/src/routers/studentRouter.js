const express = require('express');
const { handleGetAllStudents, handleCreateStudent } = require('../controller/students.controller');
const handleAddSomethingToAll = require('../controller/AddAnyKeyValueForAll.Controller');
const StudentRouter = express.Router();

StudentRouter.get('/all',handleGetAllStudents)
StudentRouter.post('/createStudent',handleCreateStudent)
// StudentRouter.post('/makeChangeForAll',handleAddSomethingToAll)

module.exports = StudentRouter;