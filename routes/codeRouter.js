const express = require("express");
const Attendance = require("../models/Attendance");
const ClassRecord = require("../models/ClassRecord");
const router = express.Router();

router.post("/", (req, res) => {
  const code = req.body.code;

  Attendance.findOne({ code: code }).then((respons) => {
    console.log(respons);

    Attendance.findOneAndDelete({ code: code })
      .then((resp) => {
        console.log("DELETED");
        console.log(resp);

        const classRec = ClassRecord({ students: respons.students });

        classRec
          .save()
          .then((resp) => {
            console.log(resp);
            return res.status(200).json({ attendance: respons });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  console.log(code);
});

router.get("/", (req, res) => {
  ClassRecord.find()
    .then((resp) => {
      res.status(200).json({ students: resp[0] });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
