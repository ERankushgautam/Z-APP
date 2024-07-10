const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./db/config");
const User = require("./db/User");
const Post = require("./db/Post");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello server!!!!");
});

// signup API
app.post("/signup", async (req, res) => {
  let existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.send({ error: "UserName already in use" });
  }
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    res.send(result);
  } catch (error) {
    res.send({ error: "fill all details" });
  }
});

// login API
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send({ user });
    } else {
      res.send({ error: "no user with these details" });
    }
  } else if (!req.body.password || req.body.email) {
    res.send({ error: "give required detail" });
  } else {
    res.send({ error: "error" });
  }
});

// post API for POSTS
app.post("/post", async (req, res) => {
  const post = new Post(req.body);
  let result = await post.save();
  result = result.toObject();
  res.send(result);
});

// post display API
app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ error: "Error fetching posts" });
  }
});

// LIKE API
app.put("/post-like", async (req, res) => {
  const { _id, userID } = req.body;
  if (!_id || !userID) {
    return res.send({ error: "Post ID and User ID are required" });
  }
  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    if (!post.like.includes(userID)) {
      post.like.push(userID);
      await post.save();
    }
    res.send({ success: "liked" });
    res.json({ likeCount: post.like.length });
  } catch (error) {
    console.log(error);
  }
});

// USER PROFILE DATA API
app.get("/profile/:id", async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).select("-password");
    if (profile) {
      res.send(profile);
    } else {
      res.send({ error: "user not found" });
    }
  } catch (error) {
    res.send({ error: "somthing went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
