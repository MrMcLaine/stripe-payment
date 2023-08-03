const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

class AuthService {
    generateToken(id, name) {
        const payload = { id, name };
        return jwt.sign(payload, secret, {expiresIn: '1h'});
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            return null;
        }
    }

    getDataFromToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
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
