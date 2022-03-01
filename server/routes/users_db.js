const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

router.get("/", (req, res) => {
  const page = parseInt(req.query.page);
  if (page < 0 || page === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1",
    };
    return res.json(response);
  }
  const query = {
    skip: 10 * page,
    limit: 10,
  };

  userModel.find({}, {}, query, (err, docs) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(docs);
    }
  });
});

module.exports = router;
