const mongoose = require('mongoose');

const connection = {};

async function connectDB() {
    if (connection.isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
        });

        connection.isConnected = db.connections[0].readyState;
        console.log(
            'MongoDB connection status:',
            connection.isConnected === 1 ? 'connected' : 'disconnected'
        );

        process.on('SIGINT', async () => {
            await db.connection.close(() => {
                console.log(
                    'Database connection disconnected through app termination'
                );
                process.exit(0);
            });
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectDB;
