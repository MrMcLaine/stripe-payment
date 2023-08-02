const express = require('express');
const router = express.Router();
const userService = require('../services/UserService');

router.post('/', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        let stripeCustomer = await stripe.customers.create({
            email: req.body.email,
            description: req.body.name,
        });

        const user = await userService.createUser(
            req.body.name,
            req.body.email,
            req.body.password,
            stripeCustomer.id,
            req.body.subscriptionId
        );

        res.json({
            status: 'success',
            message: 'User successfully created',
            user: {
                _id: user._id,
                name: user.name,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'User creation failed',
            error: error.message,
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await userService.loginUser(
            req.body.email,
            req.body.password
        );

        res.json({
            status: 'success',
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Login failed',
            error: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        res.json({
            status: 'success',
            message: 'User data fetched successfully',
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to fetch user data',
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        res.json({
            status: 'success',
            message: 'User data updated successfully',
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to update user data',
            error: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);

        res.json({
            status: 'success',
            message: 'User successfully deleted',
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to delete user',
            error: error.message,
        });
    }
});

module.exports = router;
