const mongoose = require("mongoose");

const FilesSchema = new mongoose.Schema({
  url: String,
  name: String,
  checked: {
    type: Boolean,
    default: false,
  },
});

const Files = mongoose.model("Files", FilesSchema);

module.exports = Files;
