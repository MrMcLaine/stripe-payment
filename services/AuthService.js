const jwt = require('jsonwebtoken');

class AuthService {
    generateToken(id, name) {
        const payload = { id, name };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    verifyToken(token) {
        try {

            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {

            return null;
        }
    }

    getDataFromToken(token) {

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: decoded.id, name: decoded.name });
                }
            });
        });
    }
}

module.exports = new AuthService();
