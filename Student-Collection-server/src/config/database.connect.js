const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const databaseConnect = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_DRIVER_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};

module.exports = databaseConnect;
