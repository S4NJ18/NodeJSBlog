import user from "../models/user.models.js";
import blog from "../models/blog.models.js";




export const blogList = async(req, res)=>{
    const blogs = await blog.find().populate("author","email");
    res.status(200).json(blogs);
}


export const getBlog = async(req, res)=>{
    const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
    // console.log(getAdminUser.username)

    try{
        if(!getAdminUserDetails) res.status(401).render("login")
        res.status(200).render("add-blog")
    }catch(err){
        console.log(`Blog Create Error: ${err}`)
    }

}

export const postBlog = async(req, res)=>{
    const getAdminUserDetails = await user.findById({_id:req.adminUser.id})
    const {title, content, metaDescription, metaKeywords} = req.body;
    if(!getAdminUserDetails) res.status(401).render("login")
    try{
        const addBlog = new blog({

                title:title,
                content:content,
                metaDescription:metaDescription,
                metaKeywords:metaKeywords,
                author: getAdminUserDetails._id

        }) 
        const getResponseSave = await addBlog.save();
        if(!getResponseSave) res.send("Something is wrong");
        res.status(201).render("home")
    } catch(err){
        console.log(`Post Blog Error: ${err}`)
    }

}


