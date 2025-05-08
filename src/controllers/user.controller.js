import user from "../models/user.models.js";
import bcrypt from "bcrypt";


export const getAllUserData = async (req, res)=>{
   const getLoggedinUserData = await user.findById(req.adminUser.id)
   if(!getLoggedinUserData) res.status(401).json({msg:"You are Unauthorized To See The All user data"})
   try{
       const getAllUserDataList = await user.find()
       res.status(200).send(getAllUserDataList) 
  } catch(err){
    console.log(`Found Error : ${err}`)
  }
}

export const getUserProfile = async (req,res)=>{
    // const get_id = req.adminUser.id
    // console.log(get_id)
    const getAdminUser = await user.findById({_id:req.adminUser.id})
    // console.log(getAdminUser.username)
    res.status(200).json(
        { msg: 'User is authenticated', 
          adminUser: req.adminUser.id, 
          name:getAdminUser.username 
        });
}



export const editUserProfile = async(req, res)=>{
  try{
     const {username, email, password} = req.body

     const hashedUpdatePassword = await bcrypt.hash(password,10);

     const updateField = {}

     if(username) updateField.username = username;
     if(email)  updateField.email = email;
     if(password) updateField.password = hashedUpdatePassword;

     const updateDetails = await user.findByIdAndUpdate(
      req.adminUser.id,
      {$set:updateField}, 
      {new:true},
      {runValidators:true}
     )

     const User = user.findById(req.adminUser.id)

     res.status(200).send(User.username)

  }catch(err){
    console.log(err)
  }
}