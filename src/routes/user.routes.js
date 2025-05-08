import { Router } from "express"

import {tokenVerification} from "../middlewares/auth.middleware.js"
import{getUserProfile,editUserProfile, getAllUserData} from "../controllers/user.controller.js"

import user from "../models/user.models.js";

const router = Router();


router.get("/", tokenVerification, getAllUserData)
router.get('/profile',tokenVerification,getUserProfile)
router.patch('/edit',tokenVerification, editUserProfile)




router.get('/userid/:id', async(req, res)=>{
    try{
        const userbyID = await user.findById(req.params.id)
        console.log(userbyID)
        res.status(200).json(userbyID.username)
    } catch(err){

        console.log(err)
        
    }
})


router.patch('/:id', async(req, res)=>{
    try{
       const {username, email, activeStatus} =  req.body;

       const updateField = {}

       if(username) updateField.username = username;
       if(email) updateField.email = email;
       if(activeStatus) updateField.activeStatus = activeStatus;
       

       const updateuser = await user.findByIdAndUpdate(
            req.params.id,
            {$set:updateField},
            {new:true, runValidators:true}
        )

        if (!updateuser) {
            return res.status(404).json({ msg: "User not found" });
          }
      
          res.status(200).json({
            msg: "User updated successfully",
            id:updateuser.id,
            username: updateuser.username,
            emai:updateuser.email,
            activestatus:updateuser.activeStatus
          });


    }catch(err){
        console.log(err)
    }
})

router.delete('/:id',async (req,res)=>{

    try{
       await user.findByIdAndDelete({ _id: req.params.id })
       res.status(200).json({msg:"user Deleted",})

    }catch(err){
        console.log(err)
    }

})


export default router;