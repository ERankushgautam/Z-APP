const mongoose = require("mongoose");
require("dotenv").config();
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);
