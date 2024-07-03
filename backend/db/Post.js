const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  content: { type: String, required: true },
  userName: { type: String, required: true },
});

module.exports = mongoose.model("posts", postSchema);
