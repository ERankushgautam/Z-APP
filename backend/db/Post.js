const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const postSchema = new Schema({
  userID: { type: String, required: true },
  content: { type: String, required: true },
  userName: { type: String, required: true },
  like: [{ type: String }],
});

module.exports = mongoose.model("Post", postSchema);
