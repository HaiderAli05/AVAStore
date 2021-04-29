const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('token');
    if(!token) return res.status(401).json({message: "UnAuthorized request."});
    try {
        const verified = jwt.verify(JSON.parse(token), process.env.ADMIN_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({
            message: 'Invalid Token!'
        })
    }
}