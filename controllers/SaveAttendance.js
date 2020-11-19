const Attendance = require("../models/Attendance");

const saveAttendance = (data) => {
  console.log(data);
  Attendance.find({ code: data.code })
    .then((attn) => {
      if (attn.length) {
        console.log(attn);
        Attendance.findOneAndUpdate(
          { code: data.code },
          { $push: { students: data.name } }
        )
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("EMPTY");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { saveAttendance };
