const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const meetingRoutes = require("./routes/meetingRouter");
const codeRoutes = require("./routes/codeRouter");
const { saveAttendance } = require("./controllers/SaveAttendance");
const Attendance = require("./models/Attendance");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose
  .connect("mongodb://localhost:27017/codettes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("db Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", function (socket) {
  socket.on("new-code", function (data) {
    console.log(data);

    const attn = new Attendance({
      code: data.code,
      students: [],
    });

    attn
      .save()
      .then((resp) => {
        console.log(resp);
        io.emit("new-remote-code", data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on("submit-code", function (data) {
    console.log(data);
    saveAttendance(data);
  });
});

app.use("/api", meetingRoutes);
app.use("/api/code", codeRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
