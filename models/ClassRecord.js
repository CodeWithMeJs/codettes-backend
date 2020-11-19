const mongoose = require("mongoose");

const ClassRecordSchema = new mongoose.Schema({
  students: Array,
});

const ClassRecord = mongoose.model("ClassRecord", ClassRecordSchema);

module.exports = ClassRecord;
