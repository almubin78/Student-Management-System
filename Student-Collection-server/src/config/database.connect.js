const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded

const databaseUrl = process.env.MONGODB_DRIVER_URL;

const databaseConnect = async () => {
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to the database');

        mongoose.connection.on('error', (error) => {
            console.error('Database connection error:', error);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        console.error('Stack Trace:', error.stack);
    }
};

module.exports = databaseConnect;
