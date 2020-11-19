const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const meetingRoutes = require("./routes/meetingRouter");
const codeRoutes = require("./routes/codeRouter");
const assignmentRouter = require("./routes/assignmentRouter");
const { saveAttendance } = require("./controllers/SaveAttendance");
const { resolvers, typeDefs } = require("./helper/apollo");
const Attendance = require("./models/Attendance");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

mongoose
  // .connect("mongodb://localhost:27017/codettes", {
  .connect(process.env.DB_URL, {
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

app.use("/images", express.static(path.join(__dirname, "../images")));
app.use("/api", meetingRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/files", assignmentRouter);

app.get("/", (req, res) => {
  res.send("Hello !!! Welcome To Codettes");
});

apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
