import jwt from "jsonwebtoken"


export const tokenVerification = (req, res, next) =>{
    const getTokenUser = req.cookies.token;
    if(!getTokenUser) return res.status(401).json({msg:"Access deined No token"})

    try{
        const jwt_verification_token  = jwt.verify(
            getTokenUser
            ,process.env.jwt_key_secret)
        req.adminUser = jwt_verification_token;
        next()
    }
    catch(err){
        console.log(err)
    }
}
