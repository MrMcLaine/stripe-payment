const connectDB = require('../lib/mongo');
const User = require('../models/User');
const { comparePasswords } = require('../utils/passwordUtils');

connectDB();

const userService = {
    createUser: async (
        name,
        email,
        password,
        stripeCustomerId,
        subscriptionId
    ) => {
        try {

            return await User.create({
                name,
                email,
                password,
                stripeCustomerId,
                subscriptionId,
            });
        } catch (error) {
            throw new Error('Failed to create a user');
        }
    },

    getUserById: async id => {
        try {

            return await User.findById(id);
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    },

    updateUser: async (id, data) => {
        try {

            return await User.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error('Failed to update user');
        }
    },

    deleteUser: async id => {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    },

    loginUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isValidPassword = await comparePasswords(
                password,
                user.password
            );

            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            return user;
        } catch (error) {
            throw new Error('Failed to login user');
        }
    },
};

module.exports = userService;
