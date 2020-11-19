const express = require("express");
const linkValidator = require("../helper/linkValidator");
const Meeting = require("../models/Meeting.");
const router = express.Router();

router.get("/", (req, res) => {
  Meeting.find((err, meetings) => {
    if (err) return console.error(err);
    console.log(meetings);
    res.status(200).json(meetings);
  });
});

router.post("/", (req, res) => {
  const meetingLink = req.body.code;
  console.log(meetingLink);

  const meeting = new Meeting({
    code: linkValidator(meetingLink),
    topic: req.body.topic,
  });

  meeting.save((err, meeting) => {
    if (err) return console.error(err);
    console.log(meeting);
  });

  res.status(201).json({ msg: "Received" });
});

module.exports = router;
