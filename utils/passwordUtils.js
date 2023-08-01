const { genSalt, hash, compare } = require( 'bcryptjs' );

async function hashPassword(password) {
    try {
        console.log('Start hash password', password);
        const salt = await genSalt(10);

        return await hash(password, salt);
    } catch (err) {
        throw err;
    }
}

async function comparePasswords(password, hashedPassword) {
    try {

        return await compare(password, hashedPassword);
    } catch (err) {
        throw err;
    }
}

module.exports = { hashPassword, comparePasswords };
