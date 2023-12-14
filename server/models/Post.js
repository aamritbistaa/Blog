import mongoose, { Schema, model } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, min: 6 },
    summary: String,
    content: String,
    fileName: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", PostSchema);

export default Post;
