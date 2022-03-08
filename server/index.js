require("dotenv").config();
const express = require("express");
const { urlencoded } = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const users_db = require("./routes/users_db");
const trends = require("./routes/trends");

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use("/api/hooter/users_db", users_db);
app.use("/api/hooter/trends", trends);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App started at port " + port);
});
