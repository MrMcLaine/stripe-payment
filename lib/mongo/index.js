const mongoose = require('mongoose');

const connection = {};

async function connectDB() {
    if (connection.isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        console.log('Start connecting to database');
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected:', db.connection.name);

        connection.isConnected = db.connections[0].readyState;
        console.log(
            'MongoDB connection status:',
            connection.isConnected === 1 ? 'connected' : 'disconnected'
        );

        process.on('SIGINT', async () => {
            try {
                await db.connection.close();
                console.log('Database connection disconnected through app termination');
                process.exit(0);
            } catch (err) {
                console.error(`Error while disconnecting from the database: ${err.message}`);
                process.exit(1);
            }
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectDB;
