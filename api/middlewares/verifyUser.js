const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('authToken') || req.cookies.authToken;
    if(!token) return res.status(401).sendFile(path.join(__dirname,'../../public/logIn.html'));
    try {
        const verified = jwt.verify(token, process.env.USER_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({
            Error: 'Invalid Token'
        })
    }
}