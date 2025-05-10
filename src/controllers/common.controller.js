import blog from "../models/blog.models.js";
import user from "../models/user.models.js";


export const homeHandler = async(req, res)=>{

    function stripHtmlTags(str) {
        return str ? str.replace(/<\/?[^>]+(>|$)/g, "") : "";
        }

   try{
    const rawBlogData = await blog.find().populate("author","username email");

    
        const getBlogAllListFinal = rawBlogData.map(blog => {
        const rawText = stripHtmlTags(blog.summary || blog.content);
        return {
            ...blog.toObject(),
            previewText: rawText.substring(0, 100) + "..."
        };
        });


    if(!rawBlogData) res.status(404).render('home', {errormsg:"notfound", getBlogAllListFinal:[]})

    
   
    res.status(200).render('home',{errormsg:null, getBlogAllListFinal})

     } catch(err){
        res.status(500).send("Something Went Wrong")
        console.log(err)
     }

}