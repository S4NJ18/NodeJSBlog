import dotenv from "dotenv"
import express from "express"
import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser"
import {connectDB} from "./db/DB_connection.js"
import {app} from "./app.js"
import userRoutes from "./routes/user.routes.js"
import commonRoutes from "./routes/common.routes.js"
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
import oneBlogOpen from "./routes/blog.routes.js"


// __dirname banane ke liye (ES modules ke liye)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));  // For URL-encoded form data
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Normal Path
app.use('/',commonRoutes);
app.use('/',signIn)
app.use('/',signUp)
app.use('/',createBlog)
app.use('/',blog)
app.use('/',oneBlogOpen)
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

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8080,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
        
    })
})
.catch((err)=>{
    console.log(err)
})






