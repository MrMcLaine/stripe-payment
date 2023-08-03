const jwt = require('jsonwebtoken');

class AuthService {
    generateToken(id, name) {
        const payload = { id, name };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    getDataFromToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return { id: decoded.id, name: decoded.name };
        } catch (err) {
            console.log('Error decoding token: ', err);
            return null;
        }
    }
}

module.exports = new AuthService();
