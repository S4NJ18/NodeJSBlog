import mongoose from "mongoose";

const blogCatgeorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const blogCategory = mongoose.model("blogCategory", blogCatgeorySchema);

export default blogCategory;
