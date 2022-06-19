const jwt = require("jsonwebtoken");
const User = require("../models/User");

const maxAge = 15 * 60 * 1000;
function requireAuth(req, res, next) {
  const token = req.cookies.hooterJWT;

  //check if token exists and is verified

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, verifiedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
}

//check current user
function checkUser(req, res, next) {
  const token = req.cookies.hooterJWT;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, verifiedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        let user = await User.findById(verifiedToken.id).exec();
        res.cookie("uid", user._id, {
          maxAge: maxAge * 1000,
        });
        next();
      }
    });
  } else {
    res.cookie("uid", "", { maxAge: 1 });
    next();
  }
}

module.exports = { requireAuth, checkUser };
