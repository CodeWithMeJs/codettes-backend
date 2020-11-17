const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const meetingRoutes = require("./routes/meetingRouter");

const app = express();

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

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", meetingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
