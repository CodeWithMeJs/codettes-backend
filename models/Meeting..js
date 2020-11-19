const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  code: String,
  topic: String,
});

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
