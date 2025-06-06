import user from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from 'path'

// fs.readFileSync

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

      // const logPath = path.join(__dirname, '..', '..', 'public', 'logs.txt');

      const loginIP = req.headers['x-forwarded-for']||req.ip;
      const loginTime = new Date();
      const logData = `${loginTime} - IP ${loginIP.replace("::ffff:","")}`
      const logPath = './public/log.txt'

      // res.status(200).json({msg:`welcome ${getData.username}`})

      // Logs The login Data

      const logsData = async()=>{
        try{ 

          let existingData = '';

          try{

            existingData = await fs.readFile(logPath, 'utf-8');

          }catch(err){
            if (err.code !== 'ENOENT') {
                console.error("Error reading file:", err);
                return;
              }
          }

          if(existingData.trim().length > 0){
            await fs.appendFile(logPath, `\n${logData}`, 'utf-8')
          }else{
            await fs.writeFile(logPath, logData, 'utf-8')
          }
          // console.log(existingData)

        }catch (err){

          return console.log(err)

        }
      }

      logsData()

      res.status(200).redirect("/dashboard");
    } else {
      if (req.originalUrl.startsWith("/api")) {
        res.status(401).json({ msg: "Unauthorised" });
      } else {
              const headerData = req.rateLimit.remaining;

        res.status(409).render("login", { errormsg: "Please check your Email or Password",attemptLimt: headerData, currentPage : 'login', csrfToken: req.csrfToken() });
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
      const headerData = req.rateLimit.remaining;
      return res.status(200).render("login", {
        errormsg: null,
        currentPage: "login",
        attemptLimt: headerData,
        csrfToken: req.csrfToken()
      });
    }

    // If user is valid, check from DB
    const getUserTokenID = await user.findById(req.adminUser.id);

    if (!getUserTokenID) {
      return res.status(200).render("login", {
        errormsg: null,
        currentPage: "login",
        loginlimit: headerData,
        csrfToken: req.csrfToken()
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
                currentPage: "signup" ,
                csrfToken: req.csrfToken()

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
