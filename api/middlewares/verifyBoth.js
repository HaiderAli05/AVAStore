const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('authToken') || req.cookies.authToken;
    if(!token) return res.status(401).sendFile(path.join(__dirname,'../../public/logIn.html'));
    try {
        // const adminVerified = jwt.verify(token, process.env.ADMIN_TOKEN);
        // console.log(adminVerified);
        const userVerified = jwt.verify(token, process.env.USER_TOKEN);
        console.log(userVerified);
        if(adminVerified){
            req.user = verified;
            next();
        }else if(userVerified){
            req.user = verified;
            next();
        }else{
            res.status(400).send({
                Error: 'Invalid Token'
            })
        }
    } catch (error) {
        res.status(400).send({
            Error: error
        })
    }
}