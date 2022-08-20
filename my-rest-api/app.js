const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;
const teacherRouter = require("./routes/teachers");
const classRoomRouter = require("./routes/classRooms");
const studentsRouter = require("./routes/students");
const subjectsRouter = require("./routes/subjects");
const lessonsRouter = require("./routes/lessons");
const scoreRouter = require("./routes/scores");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/teachers", teacherRouter);
app.use("/api/classRooms", classRoomRouter);
app.use("/api/students", studentsRouter);
app.use("/api/subjects", subjectsRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/scores", scoreRouter);

mongoose
  .connect("mongodb://0.0.0.0:27017/adamz")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
