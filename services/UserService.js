import connectDB from '@/lib/mongo';
import User from '@/models/User';

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
};

export default userService;
