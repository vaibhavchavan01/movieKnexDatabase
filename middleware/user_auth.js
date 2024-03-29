const perm = function check_admin(req, res, next) {
    const roles = req.decoded['user'][0]
    try {
        if(!roles['is_admin']){
            return res.status(401).send({msg:'you have no permission'})
        }
        next()
    } catch (error) {
        return res.status(400).send(error);
    }
}
module.exports = perm;