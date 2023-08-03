const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const subscriptionRoutes = require('./routes/substriptionRoutes');
const connectDB = require('./lib/mongo');
const createPlans = require('./lib/setup');
const authMiddleware = require('./middleware/authMiddleware');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {

    dotenv.config();
    connectDB();
    createPlans();
    const app = express();

    app.use(express.json());
    app.use(authMiddleware);

    app.use('/user', userRoutes);
    app.use('/transaction', transactionRoutes);
    app.use('/subscription', subscriptionRoutes);


    app.get('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
