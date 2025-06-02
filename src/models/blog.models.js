import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
     title : {
        type:String,
        required:true
        },
      url:{
         type:String
      },
      slug:{
         type:String
      },
     content:{
        type:String
        },
     image:{
        type:String
        },
     metaDescription:{
        type: String
        },
     metaKeywords:{
        type:[String]
        },
     category:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "blogCategory"
     },
     createdAt: {
       type: Date,
       default: Date.now
    },
     author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     }
});

const blog = mongoose.model("blog", blogSchema);

export default blog;
