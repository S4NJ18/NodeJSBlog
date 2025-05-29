import user from "../models/user.models.js";
import blog from "../models/blog.models.js";


export const blogList = async(req, res)=>{
  function stripHtmlTags(str) {
    return str ? str.replace(/<\/?[^>]+(>|$)/g, "") : "";
  }

  try {
    const rawBlogData = await blog.find().populate("author", "username");

    const getBlogAllListFinal = rawBlogData.map((blog) => {
      const rawText = stripHtmlTags(blog.summary || blog.content);
      return {
        ...blog.toObject(),
        previewText: rawText.substring(0, 100) + "...",
      };
    });

    if (!rawBlogData)
      res
        .status(404)
        .render("all-blog", { errormsg: "notfound", getBlogAllListFinal: [] });

    res
      .status(200)
      .render("all-blog", {
        errormsg: null,
        getBlogAllListFinal,
        currentPage: "all-blog",
      });
  } catch (err) {
    res.status(500).send("Something Went Wrong");
    console.log(err);
  }
}

export const apiBlogList = async(req, res) =>{
  const allBlogs = await blog.find().populate("author",["username"])
  res.status(200).json(allBlogs)
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




