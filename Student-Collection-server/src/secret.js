require('dotenv').config();

const port = process.env.PORT;
const databaseUrl = process.env.MONGODB_DRIVER_URL
const json_key_active = process.env.JSON_WEB_ACTIVATION_KEY



module.exports = {
    port,
    databaseUrl,
    json_key_active

}
