const mongoose = require('mongoose');
const { hashPassword } = require('../utils/passwordUtils');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    stripeCustomerId: {
        type: String,
        required: true,
    },
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription',
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('payment_user', userSchema);
