import user from "../models/user.models.js";
import jwt from "jsonwebtoken"

export const authStatusMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.locals.userLoggedin = false;
      return next();
    }

    const jwt_verify = jwt.verify(token, process.env.jwt_key_secret);
    const userDetails = await user.findById(jwt_verify.id);

    if (userDetails) {
      res.locals.userLoggedin = true; // means user is logged in
    } else {
      res.locals.userLoggedin = false;
    }

    next();
  } catch (err) {
    console.log("authStatusMiddleware Error:", err);
    res.locals.userLoggedin = false;
    next();
  }
};
