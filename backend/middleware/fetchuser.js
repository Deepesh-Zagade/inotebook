const jwt = require('jsonwebtoken');

const JWTSECRET = 'jaihinddoston'

const fetchuser = (req,res,next)=>{
// Get the user from JWT token and add it to req object
 const token = req.header('auth-token')
 if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" })
 }
    try {
        let data = jwt.verify(token,JWTSECRET)
        req.user = data.user      // getting jwt ka payload , refer Route 2 ka jwt.sign
        next()
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;