const express = require('express');
const next = require('next');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

    app.use(express.json()); // for parsing application/json

    app.get('*', (req, res) => {
        return handle(req, res); // for all the React routing
    });

    app.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
