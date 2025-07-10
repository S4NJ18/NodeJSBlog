import user from "../models/user.models.js";
import blog from "../models/blog.models.js";
import blogCategory from "../models/category.models.js";
import jwt from "jsonwebtoken";

export const dashboardHandler = async (req, res) => {
  try {
    const getAdminUserDetails = await user.findById({ _id: req.adminUser.id });
    if (!getAdminUserDetails) res.status(401).render("login");
    const totalBlog = (await blog.find()).length;
    const totalCategory = (await blogCategory.find()).length;

    res
      .status(200)
      .render("dashboard", {
        user: getAdminUserDetails,
        page: "dashboard",
        blogCount: totalBlog,
        catCount: totalCategory,
      });
  } catch (err) {
    console.log(`Dashboard Error: ${err}`);
  }
};
