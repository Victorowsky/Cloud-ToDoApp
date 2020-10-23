import React, { useState, useEffect } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Tasks from "./Components/Tasks";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

function App() {
  const [tasks, setTasks] = useState([]);
  if (!localStorage.getItem("userID")) {
    localStorage.setItem("userID", Math.floor(Math.random() * 1000000000));
  }
  const [currentTask, setCurrentTask] = useState("");
  const [importantChecked, setImportantChecked] = useState(false);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetch(`https://just-cheddar-yumberry.glitch.me/take/tasks/${userID}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (currentTask) {
      fetch(
        `https://just-cheddar-yumberry.glitch.me/add/tasks/${currentTask}/${importantChecked}/${userID}`,
        {
          method: "POST",
        }
      );
      setImportantChecked(false);
      setCurrentTask("");
    }
    // RELOAD DATA
    fetch(`https://just-cheddar-yumberry.glitch.me/take/tasks/${userID}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const handleDeleteTask = (e) => {
    const answer = window.confirm(`Are you sure about delete this task?`);
    if (answer) {
      fetch(
        `https://just-cheddar-yumberry.glitch.me/delete/tasks/${e.target.dataset.index}`,
        {
          method: "POST",
        }
      );
    }
    // RELOAD DATA
    fetch(`https://just-cheddar-yumberry.glitch.me/take/tasks/${userID}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  return (
    <div className="app">
      <div className="addTask">
        <form onSubmit={handleAddTask} formMethod="POST">
          <h1> Add task</h1>
          <TextField
            id="standard-basic"
            label="Insert your task"
            style={{ color: "white !important" }}
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
          <div className="checkbox">
            <Checkbox
              checked={importantChecked}
              style={{
                width: "fit-content",
              }}
              onChange={() => {
                setImportantChecked((prev) => !prev);
              }}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <p>Important</p>
          </div>

          <Button
            variant="contained"
            type="submit"
            style={{
              marginTop: "5px",
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            color="primary"
            onSubmit={handleAddTask}
          >
            Add
          </Button>
        </form>
      </div>

      <Tasks tasks={tasks} handleDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
