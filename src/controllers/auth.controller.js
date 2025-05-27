import user from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const postSignInHandler = async (req, res) => {
  try {
    // get the User data from database
    const getData = await user.findOne({ email: req.body.email });
    if (!getData) return res.status(401).json({ msg: "Invalid Email" });

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      getData.password
    );
    if (passwordCheck) {
      // set jwt token
      const jwt_token = jwt.sign(
        { id: getData._id },
        process.env.jwt_key_secret,
        { expiresIn: "1d" },
        { algorithm: "sha256" }
      );

      res.cookie("token", jwt_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // res.status(200).json({msg:`welcome ${getData.username}`})

      res.status(200).redirect("/dashboard");
    } else {
      if (req.originalUrl.startsWith("/api")) {
        res.status(401).json({ msg: "Unauthorised" });
      } else {
        res
          .status(409)
          .render("login", { errormsg: "Please check your Email or Password" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export const getSignInHandler = async (req, res) => {
  try {
    // Check if token was verified and user was attached
    if (!req.adminUser || !req.adminUser.id) {
      return res.status(200).render("login", {
        errormsg: null,
        currentPage: "login",
      });
    }

    // If user is valid, check from DB
    const getUserTokenID = await user.findById(req.adminUser.id);

    if (!getUserTokenID) {
      return res.status(200).render("login", {
        errormsg: null,
        currentPage: "login",
      });
    } else {
      return res.status(301).redirect("/dashboard");
    }
  } catch (err) {
    console.log(`Error Found : ${err}`);
    return res.status(500).send("Server Error");
  }
};


export const PostSignUpHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkExistingData = await user.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (!checkExistingData) {
      const newUser = new user({
        username: username,
        email: email,
        password: password,
      });
      const newUserSaved = await newUser.save();
      res.status(200).redirect("/login");
      res.status(201).json(newUserSaved);
    } else if (checkExistingData.email == req.body.email) {
      if (req.originalUrl.startsWith("/api")) {
        res.status(409).json({ msg: "This Email Already used"});
      } else {
        res.status(409).render("signup", { errormsg: "Email is already use", currentPage :"signup"});
      }
    } else if (checkExistingData.username == req.body.username) {
      res.status(409).json({ msg: "This Username Already Taken" });
    } else {
      res.status(409).json({ msg: "All field are required" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const GetSignUpHandler = async (req, res) => {
  try {

    if(!req.adminUser || !req.adminUser.id){
        return res.status(200).render("signup", 
            { errormsg: null,
                currentPage: "signup" 
            });
    }
    const getUserTokenID = await user.findById({ _id: req.adminUser.id });

    if (!getUserTokenID) {
      return res.status(200).render("signup", { errormsg: null, currentPage: "signup" });
    } else {
        return res.status(301).redirect("/dashboard");
    }
  } catch (err) {
    console.log(`Error Found : ${err}`);
    return res.status(500).send("Server Error");
  }
};

export const logoutHandler = (req, res) => {
  res.clearCookie("token"); // Remove the JWT token
  res.redirect("/login");
};
