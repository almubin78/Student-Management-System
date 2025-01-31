
const cors = require('cors');
const app = require("./src/app");
const databaseConnect = require("./src/config/database.connect");
const { port } = require('./src/secret');
// const { createMonthData } = require('./src/controller/recordController');

const corsConfig = {
    origin:"*",
    Credential:true,
    methods:["GET","POST","PUT","DELETE"]
}
app.options('',cors(corsConfig))
app.use(cors());

// createMonthData()

app.listen(port,()=>{
    databaseConnect()
    console.log(`app connected in index.js by listen at ${port}`);
})