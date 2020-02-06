const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.client_id);

module.exports = function(req,res,next){
    client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.client_id
    })
    .then(verified=>{
        req.payload=verified.getPayload()
        next()
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}