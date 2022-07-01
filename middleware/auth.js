const Jwt = require('jsonwebtoken');

const auth = function authenticate(req, res, next) {
    try {
        const token = req.headers["x-access-token"] || (req.headers["authorization"]);
        if (typeof token == 'undefined') {
            return res.status(403).send("Access denied.");
        }
        const newtoken = token.split(' ')[1];
        if (!newtoken) {
            return res.status(403).send("Access denied.");
        }
        const decoded = Jwt.verify(newtoken, process.env.SECRETE_KEY,(err, decoded)=>{
            if (err){
                    return res.status(403).send({ msg: 'token expired' })
            }
            req.decoded = decoded; 
            next(); 
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth