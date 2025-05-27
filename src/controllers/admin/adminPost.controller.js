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
        res.status(200).render("add-blog",{user:getAdminUserDetails,page:"create"})
    }catch(err){
        console.log(`Blog Create Error: ${err}`)
    }

}


// Save the Post content 

export const createPost = async(req, res) => {
    const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
    const {title, content, metaDescription, metaKeywords } = req.body;
    const imageFile = req.file.path;
    const imagePath = imageFile.replace(/\\/g, '/').replace('public/', '');
    console.log(imagePath)
    const convert_smallLetter = title.toLowerCase();
    const add_dash_text = convert_smallLetter.replaceAll(" ","-")
    const makeURLslug = `http://localhost:8000/blogs/${add_dash_text}`
    if(!getAdminUserDetails) res.status(401).render("login")
    // Check if image file is uploaded
    if (!imageFile) {
        return res.status(400).json({ error: "Image is required" });
    }
    try{
        const addBlog = new blog({

                title:title,
                url:makeURLslug,
                slug:add_dash_text,
                content:content,
                image:imagePath,
                metaDescription:metaDescription,
                metaKeywords:metaKeywords,
                author: getAdminUserDetails._id

        }) 
        const getResponseSave = await addBlog.save();
        // if(!getResponseSave) res.send("Something is wrong");
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
 try {
        const getAdminUserDetails = await user.findById({ _id: req.adminUser.id });

        if (!getAdminUserDetails) {
            return res.status(401).render("login");
        }

        const { title, content, metaDescription, metaKeywords } = req.body;
        let imagePath = '';

        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, '/').replace('public/', '');
        }

        const updatedPost = await blog.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                metaDescription,
                metaKeywords,
                ...(imagePath && { image: imagePath }) // Update image only if it is uploaded
            },
            { new: true }
        );

        res.status(302).redirect("/admin/allpost");

    } catch (err) {
        console.log(`Post Edit Error: ${err}`);
        return res.status(500).send("Something went wrong.");
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


