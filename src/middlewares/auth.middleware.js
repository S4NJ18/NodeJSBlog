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
    if(!getUserWebToken) res.status(301).redirect("/login")
    const result = jwt.verify(getUserWebToken,process.env.jwt_key_secret)
    if(!result) return res.status(401).send("<p>Access Denied</p>")
    try{
        req.adminUser = result;
        next()   
    }catch(err){
        console.log(`Web Token Verification Error: ${err}`)
     }

}

export const userTokenVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // No token, proceed to login/signup page
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.jwt_key_secret);
    req.adminUser = decoded;
    // Token valid → redirect to dashboard instead of running login handler
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(`JWT Error: ${err}`);
    // Token invalid or expired → continue to login/signup page
    return next();
  }
};




