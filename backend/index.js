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
  } else if (!req.body.password || !req.body.email) {
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
  const post = await Post.find();
  res.send(post);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
