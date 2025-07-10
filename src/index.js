import dotenv from "dotenv"
import express from "express"
import multer from "multer";
import path from "path"
import csurf from "csurf";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser"
import {connectDB} from "./db/DB_connection.js"
import {app} from "./app.js"
import userRoutes from "./routes/user.routes.js"
import commonRoutes from "./routes/common.routes.js"
import aboutUs from  "./routes/common.routes.js"
import createCategory from "./routes/admin/adminCategory.routes.js"
import editUserRouts from "./routes/user.routes.js"
import deleteUserRouts from "./routes/user.routes.js"
import signIn from "./routes/auth.routes.js"
import signUp from "./routes/auth.routes.js"
import dashboardRoutes from "./routes/admin/dashboard.routes.js"
import adminPostListRoutes from "./routes/admin/adminPost.routes.js"
import adminPostDelete from "./routes/admin/adminPost.routes.js"
import adminPostEdit from "./routes/admin/adminPost.routes.js"
import createBlog from "./routes/blog.routes.js"
import blog from "./routes/blog.routes.js"
import apiBlogList from "./routes/blog.routes.js"
import oneBlogOpen from "./routes/blog.routes.js"
import { authStatusMiddleware } from "./middlewares/authStatus.js";
// __dirname banane ke liye (ES modules ke liye)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));  // For URL-encoded form data
app.use(cookieParser());
// const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);


app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Normal Path
app.use(authStatusMiddleware)
app.use('/',commonRoutes);
app.use('/',signIn)
app.use('/',signUp)
app.use('/',createBlog)
app.use('/',createCategory)
app.use('/',blog)
app.use('/',oneBlogOpen)
app.use('/',aboutUs)
app.use('/', dashboardRoutes)
app.use('/', adminPostListRoutes)
app.use('/', adminPostEdit)
app.use('/', adminPostDelete)
app.use('/profile',editUserRouts);
app.use('/profile/delete',deleteUserRouts);

// Api Path
app.use('/api/auth',signIn);
app.use('/api/auth', signUp);
app.use('/api/alluser',userRoutes)
app.use('/api',apiBlogList)


// This means: if none of the routes match this middleware will run.

app.use((req, res) => {
  res.status(404).render("NotFound");
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8080,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
        
    })
})
.catch((err)=>{
    console.log(err)
})






