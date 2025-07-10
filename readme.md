# 📝 Node.js Blog Backend & Frontend Project With Rest API Endpoint

## 📖 Summary

This is a **feature-rich backend** project for a blog website built using modern Node.js technologies. It includes secure and scalable components like:

- **Node.js** with **Express.js** for server and routing  
- **MongoDB** with **Mongoose** for database operations  
- **JWT** and **Bcrypt** for secure authentication (Login/Signup)  
- **Access & Refresh Tokens** for session management  
- **Multer** for file uploads  
- **EJS** for rendering views  
- Follows best practices for code structure, environment management, and modularization  

You'll find complete CRUD functionality:
- User Signup / Login  
- Create, Read, Update, and Delete blog posts  
- Token-based authentication & session handling  

> I’ve spent significant time building this, and I’m confident it’s a great resource to learn real-world backend development.

---

## ⚙️ Prerequisites

- Node.js (v18 or above)  
- MongoDB (local or Atlas)  
- A code editor like VSCode

---

## 🚀 Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/S4NJ18/NodeJSBlog.git
cd nodejs-backend

# 2. Install dependencies
npm install

# 3. Create a .env file in the root directory with the following:
PORT=8000
MONGODB_URI=your_mongodb_connection_string
jwt_key_secret=your_access_token_secret

# 4. Start the development server
npm start
