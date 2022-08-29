const Jwt = require('jsonwebtoken');

const auth = function authenticate(req, res, next) {
    try {
        const token =req.headers["authorization"];
        if (typeof token == 'undefined') {
            return res.status(403).send("Access denied.");
        }
        if (!token) {
            return res.status(403).send("Access denied.");
        }
        const decoded = Jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({ msg: 'token expired' })
            }
            req.decoded = decoded;
            next();
        })
    } catch (error) {
        return res.send({ Error: error.message });
    }
}

module.exports = auth