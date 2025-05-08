import jwt from "jsonwebtoken"



// API token Verification 
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



// Normal Token Verification


export const webTokenVerification = (req, res, next) =>{
    const getUserWebToken = req.cookies.token
    if(!getUserWebToken) res.status(401).render("login")
    const result = jwt.verify(getUserWebToken,process.env.jwt_key_secret)
    if(!result) return res.status(401).send("<p>Access Denied</p>")
     
        try{
            req.adminUser = result;
            next()
        }catch(err){
            console.log(`Web Token Verification Error: ${err}`)
        }

}
