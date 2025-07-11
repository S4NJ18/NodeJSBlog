import user from "../../models/user.models.js";

import blog from "../../models/blog.models.js";

import blogCategory from "../../models/category.models.js";

// Get Post lIST

export const allPostList = async (req, res) => {
  try {
    const getAdminUserDetails = await user.findById({ _id: req.adminUser.id });
    const getAllpostList = await blog
      .find()
      .populate("author", "username")
      .populate("category", "name");
    // console.log(getAllpostList[7])
    if (!getAdminUserDetails) res.status(301).redirect("/login");
    res
      .status(200)
      .render("admin-post-list", {
        allpostlist: getAllpostList,
        user: getAdminUserDetails,
        page: "admin-post-list",
      });
  } catch (err) {
    console.log(console.log(`All admin post List ${err}`));
  }
};

// Renders Text Editor

export const getPost = async (req, res) => {
  // console.log(getAdminUser.username)

  try {
    const getAdminUserDetails = await user.findById({ _id: req.adminUser.id });
    if (!getAdminUserDetails) return res.status(401).render("login");
    const getCategoryDetails = await blogCategory.find();
    // const csrfToken = req.cookies._csrf;
    //  res.cookie('_csrf',csrfToken);
    //  console.log(csrfToken)
    //  console.log(req.cookies)
    return res
      .status(200)
      .render("add-blog", {
        user: getAdminUserDetails,
        categoryDetail: getCategoryDetails,
        page: "create",
        csrfToken:req.csrfToken(),
      });

  } catch (err) {
    console.log(`Blog Create Error: ${err}`);
  }
};

// Save the Post content

export const createPost = async (req, res) => {
  try {


    // 1. Get admin user
    const getAdminUserDetails = await user.findById(req.adminUser.id);
    if (!getAdminUserDetails) {
      return res.status(401).render("login");
    }

    // 2. Extract form data
    const { title, content, metaDescription, metaKeywords, category } =
      req.body;

    // 3. Check and handle uploaded file
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imageFile = req.file.path;
    const imagePath = imageFile.replace(/\\/g, "/").replace("public/", "");

    // 4. Slug creation
    const convert_smallLetter = title.toLowerCase();
    const add_dash_text = convert_smallLetter.replaceAll(" ", "-");
    const makeURLslug = `http://localhost:8000/blogs/${add_dash_text}`;

    // 5. Create and save blog
    const addBlog = new blog({
      title,
      url: makeURLslug,
      slug: add_dash_text,
      content,
      image: imagePath,
      metaDescription,
      metaKeywords,
      category,
      author: getAdminUserDetails._id,
    });

    const getResponseSave = await addBlog.save();

    res.status(201).redirect("/admin/allpost");
  } catch (err) {
    console.log(`Post Blog Error: ${err}`);
    res.status(500).send("Internal Server Error");
  }
};

export const postEditGetByID = async (req, res) => {
  try {
    const getAdminUserDetails = await user.findById({ _id: req.adminUser.id });
    if (!getAdminUserDetails) res.status(301).redirect("/login");
    const getSingleBlogDetails = await blog.findById(req.params.id);
    const getCategoryDetails = await blogCategory.find();
    return res
      .status(200)
      .render("edit-blog", {
        prevalue: getSingleBlogDetails,
        categoryDetail: getCategoryDetails,
        page: "edit-post",
        user: getAdminUserDetails,
      });
  } catch (err) {
    console.log(`Found the error: ${err}`);
  }
};

// Edit Post

export const postEditByID = async (req, res) => {
  try {
    const getAdminUserDetails = await user.findById({ _id: req.adminUser.id });

    if (!getAdminUserDetails) {
      return res.status(401).render("login");
    }

    const { title, content, metaDescription, metaKeywords, category } =
      req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, "/").replace("public/", "");
    }

    const updatedPost = await blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        metaDescription,
        metaKeywords,
        category,
        ...(imagePath && { image: imagePath }), // Update image only if it is uploaded
      },
      { new: true }
    );

    res.status(302).redirect("/admin/allpost");
  } catch (err) {
    console.log(`Post Edit Error: ${err}`);
    return res.status(500).send("Something went wrong.");
  }
};

// Delete Post By Id

export const postDeleteByID = async (req, res) => {
  try {
    const getAdminUserDetails = await user.findById({ _id: req.adminUser.id });
    if (!getAdminUserDetails) res.status(301).redirect("/login");

    await blog.findByIdAndDelete(req.params.id);

    res.status(200).redirect("/admin/allpost");
  } catch (err) {
    console.log(console.log(`All admin post List ${err}`));
  }
};
