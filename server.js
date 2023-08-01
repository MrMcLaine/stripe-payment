const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const userService = require('./services/UserService');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

    app.use(express.json());

    app.post('/user', async (req, res) => {
        const user = await userService.createUser(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.stripeCustomerId,
            req.body.subscriptionId
        );
        res.json(user);
    });

    app.get('/user/:id', async (req, res) => {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    });

    app.put('/user/:id', async (req, res) => {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    });

    app.delete('/user/:id', async (req, res) => {
        const user = await userService.deleteUser(req.params.id);
        res.json(user);
    });

    app.get('*', (req, res) => {
        return handle(req, res); // for all the React routing
    });

    app.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
