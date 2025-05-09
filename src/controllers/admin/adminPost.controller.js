import user from "../../models/user.models.js";

import blog from "../../models/blog.models.js";


// Get Post lIST

export const allPostList = async(req, res)=>{
   try{
    const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
    const getAllpostList = await blog.find().populate("author","username");
    if(!getAdminUserDetails) res.status(301).redirect("/login")
    res.status(200).render("admin-post-list",{allpostlist:getAllpostList})

   }catch(err){
    console.log(console.log(`All admin post List ${err}`))
   }
}


// Renders Text Editor 

export const getPost = async(req, res)=>{
    const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
    // console.log(getAdminUser.username)
    try{
        if(!getAdminUserDetails) res.status(401).render("login")
        res.status(200).render("add-blog")
    }catch(err){
        console.log(`Blog Create Error: ${err}`)
    }

}


// Save the Post content 

export const createPost = async(req, res)=>{
    const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
    const {title, content, metaDescription, metaKeywords} = req.body;
    const convert_smallLetter = title.toLowerCase();
    const add_dash_text = convert_smallLetter.replaceAll(" ","-")
    const makeURLslug = `http://localhost:8000/blogs/${add_dash_text}`
    if(!getAdminUserDetails) res.status(401).render("login")
    try{
        const addBlog = new blog({

                title:title,
                url:makeURLslug,
                slug:add_dash_text,
                content:content,
                metaDescription:metaDescription,
                metaKeywords:metaKeywords,
                author: getAdminUserDetails._id

        }) 
        const getResponseSave = await addBlog.save();
        if(!getResponseSave) res.send("Something is wrong");
        res.status(201).redirect("/admin/allpost")
    } catch(err){
        console.log(`Post Blog Error: ${err}`)
    }

}

export const postEditGetByID = async (req, res ) =>{
    try{
        const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
        if(!getAdminUserDetails) res.status(301).redirect("/login")
        const getSingleBlogDetails = await blog.findById(req.params.id)
        res.status(200).render("edit-blog",{prevalue:getSingleBlogDetails})
    } catch(err){
       console.log(`Found the error: ${err}`)
    }
}


export const postEditByID = async(req, res)=>{

   
    try{
        const {title, content, metaDescription, metaKeywords} = req.body;
        const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
        if(!getAdminUserDetails) res.status(301).redirect("/login")
        const saveData =  await blog.findByIdAndUpdate
                (req.params.id,
                    {
                     title:title,
                     content:content,
                     metaDescription:metaDescription,
                     metaKeywords:metaKeywords
                    },{new:true}
                )
        res.status(302).redirect("/admin/allpost"); 
    }catch(err){
        console.log(`Post Edited Error Found: ${err}`)
    }

}


// Delete Post By Id

export const postDeleteByID = async (req, res)=>{
    try{
        const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
        if(!getAdminUserDetails) res.status(301).redirect("/login")
        
        await blog.findByIdAndDelete(req.params.id);

        res.status(200).redirect("/admin/allpost")
    
       }catch(err){
        console.log(console.log(`All admin post List ${err}`))
       }
}


