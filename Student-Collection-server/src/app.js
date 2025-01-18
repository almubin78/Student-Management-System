const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const MessageRouter = require('./routers/messageRouter');
const StudentRouter = require('./routers/studentRouter');
const AttendRouter = require('./routers/attendRouter');
const recordRouter = require('./routers/recordRouter');
const allDataRouter = require('./routers/allDataRouter');
const StudentCollection = require('./models/StudentModel');
const databaseConnect = require('./config/database.connect');
// 
const app = express();
databaseConnect()
const limiter = rateLimit({
    windowMs:10*60*1000,
    limit:5,
    message:"You have hit 5 time already"
})
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(morgan('dev'));
// app.use(limiter)


// Router call
app.get('/',(req,res)=>{
    res.send('ব্রেইন পরিবর্তনশীল,দুর্বল Student বলে কোন শব্দ নেই।')
})


//
app.use('/message',MessageRouter);
app.use('/students',StudentRouter);
app.use('/attendance',AttendRouter);
app.use('/records',recordRouter);
app.use('/data',allDataRouter);




module.exports = app;