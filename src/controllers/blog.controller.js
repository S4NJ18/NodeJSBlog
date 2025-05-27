import user from "../models/user.models.js";
import blog from "../models/blog.models.js";


export const blogList = async(req, res)=>{
    const blogs = await blog.find().populate("author",["username","email"]);
    res.status(200).json(blogs);
}

export const blogOpen = async(req, res)=>{
    const slug = req.params.slug;
    const oneBlog = await blog.findOne({ slug });
  
    if (!oneBlog) {
      return res.status(404).send("Blog not found");
    }
    console.log(oneBlog)
  
    res.status(200).render("single-blog",{singleBlogData:oneBlog});
}




