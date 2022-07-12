const perm = function check_admin(req, res, next) {
    const roles = req.decoded['user'][0]
    try {
        if(!roles['is_admin']){
            return res.status(401).send({msg:'you have no permission'})
        }
        next()
    } catch (error) {
        console.log(error);
    }
}
module.exports = perm;