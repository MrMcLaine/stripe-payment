const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./lib/mongo');



const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {

    dotenv.config();
    connectDB();
    const app = express();

    app.use(express.json());

    app.use('/user', userRoutes);

    app.get('*', (req, res) => {
        return handle(req, res); // for all the React routing
    });

    app.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
