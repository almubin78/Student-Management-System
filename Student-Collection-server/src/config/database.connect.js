const mongoose = require('mongoose');
const { databaseUrl } = require('../secret');

const databaseConnect = async (parameter = {}) => {
    try {
        await mongoose.connect(databaseUrl);
        console.log('Connected to the database:', databaseUrl);

        mongoose.connection.on('error', (error) => {
            console.error('Database connection error:', error);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        console.error('Stack Trace:', error.stack);
        console.log(databaseUrl,'===== database url');
    }
};

module.exports = databaseConnect;
