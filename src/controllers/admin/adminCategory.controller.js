import user from "../../models/user.models.js";

import blogCategory from "../../models/category.models.js";

export const allCategoryList = async (req, res) => {
  try {
    const getUserDetails = await user.findById(req.adminUser.id);
    if (!getUserDetails) return res.status(301).redirect("/login");
    const getCategoryList = await blogCategory
      .find()
      .populate("author", "username");
    res
      .status(200)
      .render("admin-category-list", {
        category: getCategoryList,
        page: "category-list",
        user: getUserDetails,
      });
  } catch (err) {
    return console.log(err);
  }
};

export const getCategory = async (req, res) => {
  try {
    const getUserDetails = await user.findById(req.adminUser.id);
    if (!getUserDetails) res.status(301).redirect("/login");
    return res
      .status(200)
      .render("add-category", {
        page: "Add Category",
        user: getUserDetails,
        csrfToken: req.csrfToken()
      });
  } catch (err) {
    return console.log(err);
  }
};

export const saveCategory = async (req, res) => {
  try {
    const getUserDetails = await user.findById(req.adminUser.id);
    if (!getUserDetails) res.status(301).redirect("/login");
    const { title, content, metaDescription, metaKeywords } = req.body;
    // Slug creation
    const convert_smallLetter = title.toLowerCase();
    const add_dash_text = convert_smallLetter.replaceAll(" ", "-");
    const makeURLslug = `http://localhost:8000/${add_dash_text}`;

    const addCategoryData = new blogCategory({
      name: title,
      description: content,
      metaDescription: metaDescription,
      metaKeywords: metaKeywords,
      slug: makeURLslug,
      author: getUserDetails._id,
    });

    await addCategoryData.save();

    return res.status(200).redirect("/admin/all-category");
  } catch (err) {
    return console.log(err);
  }
};

export const categoryDeleteByID = async (req, res) => {
  try {
    const getUserDetails = await user.findById(req.adminUser.id);
    if (!getUserDetails) return res.status(301).redirect("/login");

    await blogCategory.findByIdAndDelete(req.params.id);
    res.status(301).redirect("/admin/all-category");
  } catch (err) {
    return console.log(err);
  }
};

export const categoryEditGetByID = async (req, res) => {
  try {
    const getUserDetails = await user.findById(req.adminUser.id);
    if (!getUserDetails) res.status(301).redirect("/login");
    const getCategoryData = await blogCategory.findById(req.params.id);
    console.log(getCategoryData);
    return res
      .status(200)
      .render("add-category", {
        page: "Edit Category",
        user: getUserDetails,
        category: getCategoryData,
      });
  } catch (err) {
    return err;
  }
};

export const categoryEditByID = async (req, res) => {
  try {
    const getUserDetails = await user.findById(req.adminUser.id);
    if (!getUserDetails) res.status(301).redirect("/login");

    const { title, content, metaDescription, metaKeywords } = req.body;
    // Slug creation
    const convert_smallLetter = title.toLowerCase();
    const add_dash_text = convert_smallLetter.replaceAll(" ", "-");
    const makeURLslug = `http://localhost:8000/category/${add_dash_text}`;

    const getCategoryData = await blogCategory.findByIdAndUpdate(
      req.params.id,
      {
        name: title,
        description: content,
        metaDescription: metaDescription,
        metaKeywords: metaKeywords,
        slug: makeURLslug,
        author: getUserDetails._id,
      },
      { new: true }
    );

    return res.status(200).redirect("/admin/all-category");
  } catch (err) {
    return err;
  }
};
