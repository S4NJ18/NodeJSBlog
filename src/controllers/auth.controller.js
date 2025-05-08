import user from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signInHandler= async(req, res)=>{

    try{
        // get the User data from database  
        const getData = await user.findOne({email:req.body.email})
        if(!getData) return res.status(401).json({msg:"Invalid Email"})
        
        const passwordCheck = await bcrypt.compare(req.body.password, getData.password)
        if(passwordCheck){
            // set jwt token
            const jwt_token = jwt.sign(
                {id:getData._id},
                process.env.jwt_key_secret,
                {expiresIn:"1d"},
                {algorithm:"sha256"}
            )

            res.cookie("token",jwt_token,
                {  
                    httpOnly: true,
                    secure: false, 
                    sameSite: "lax",
                    maxAge: 24 * 60 * 60 * 1000 
                });
                
            res.status(200).json({msg:`welcome ${getData.username}`})
                    
            }else{
                res.status(401).json({msg:"Unauthorised"})
            }

    }catch(err){
        console.log(err);
    }
}

export const signUpHandler = async(req, res)=>{
    try{
        const {username, email, password} = req.body;
        const checkExistingData = await user.findOne({$or:[{email: req.body.email}, {username: req.body.username}]});
        if (!checkExistingData){
            const newUser = new user ({
                username: username, 
                email: email, 
                password: password
            });
            const newUserSaved = await newUser.save();
            res.status(201).json(newUserSaved);
        } else if (checkExistingData.email == req.body.email) {
            res.status(409).json({msg:"This Email Already used"})
        } else if(checkExistingData.username == req.body.username){
            res.status(409).json({msg:"This Username Already Taken"})
        } else {
            res.status(409).json({msg:"All field are required"}) 
        }

    }catch(err){
        console.log(err)
    }
}


export const logoutHandler = (req, res) =>{
    res.clearCookie('token'); // Remove the JWT token
    res.redirect('/login');  
}
