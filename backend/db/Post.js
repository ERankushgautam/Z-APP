const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const commentSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
});
const postSchema = new Schema({
  userID: { type: String, required: true },
  content: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  like: [{ type: String }],
  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
