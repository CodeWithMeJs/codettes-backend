const express = require("express");
const Files = require("../models/Files");
const router = express.Router();

router.get("/", (req, res) => {
  Files.find()
    .then((resp) => {
      res.status(200).json({ files: resp });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch("/", (req, res) => {
  Files.findOneAndUpdate({ _id: req.body.id }, { checked: true })
    .then((resp) => {
      res.status(200).json({ files: resp });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
