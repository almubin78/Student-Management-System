const app = require("../src/app");
const databaseConnect = require("../src/config/database.connect");
const { port } = require("../src/secret");
const cors = require('cors');

app.use(cors());



app.listen(port,()=>{
    databaseConnect()
    console.log(`app connected in index.js by listen at ${port}`);
})