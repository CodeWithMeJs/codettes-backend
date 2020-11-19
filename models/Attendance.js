const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  students: Array,
  code: String,
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
