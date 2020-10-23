const express = require("express");
const mongoose = require("mongoose");
const Task = require("./model/task");
const app = express();
const port = 4000;

const dataURI = `mongodb+srv://admin:eOccNpOCD2nHy3F2@cluster0.ktmcd.mongodb.net/express?retryWrites=true&w=majority`;

app.use(express.json());

mongoose.connect(
  dataURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(`Bląd połaczenia z baza danych: ${err}`);
  }
);

app.get("/", (req, res) => {
  res.send("Express backend");
});

app.get("/take/tasks/:userID", (req, res) => {
  const { userID } = req.params;
  Task.find({ userID: userID }, (err, data) => {
    if (err) console.log(`Coś poszło nie tak z pobieraniem danych: ${err}`);
    return res.json(data);
  });
});

app.post("/delete/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = Task.deleteOne({ _id: id }, (err) => {
    if (err) console.log(err);
  });
});

app.post("/add/tasks/:title/:important/:userID", (req, res) => {
  const { title, important, userID } = req.params;
  console.log(title, important, userID);

  const tasks = new Task({
    userID: userID,
    userData: {
      text: title,
      important: important,
    },
  });
  console.log(req.params);
  tasks.save((err) => console.log(err));
  res.redirect("back");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
