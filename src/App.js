import React, { useState, useEffect } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Tasks from "./Components/Tasks";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import RefreshIcon from "@material-ui/icons/Refresh";
import anime from "animejs/lib/anime.es.js";

function App() {
  const ApiURL = "https://testing-project9034.herokuapp.com";
  const [tasks, setTasks] = useState([]);

  const [reloadData, setReloadData] = useState(1);
  const [currentTask, setCurrentTask] = useState("");
  const [importantChecked, setImportantChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!localStorage.getItem("userID")) {
    localStorage.setItem("userID", Math.floor(Math.random() * 1000000000));
  }
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetch(`${ApiURL}/take/tasks/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        if (data.length === 0) {
          setIsLoading(false);
          console.log(isLoading);
        }
      });
  }, [isLoading, reloadData, userID]);

  const handleAddTask = (e) => {
    if (e) e.preventDefault();
    if (currentTask) {
      fetch(
        `${ApiURL}/add/tasks/${currentTask}/${importantChecked}/${userID}`,
        {
          method: "POST",
          mode: "no-cors",
        }
      ).then(() => setReloadData(reloadData + 1)); //RELOAD DATA
      setImportantChecked(false); // CLEAR IMPORTANT BUTTON
      setCurrentTask(""); // CLEAR INPUT
    }
  };

  const handleDeleteTask = (e) => {
    const answer = window.confirm(`Are you sure about delete this task?`);
    if (answer) {
      fetch(`${ApiURL}/delete/tasks/${e.target.dataset.index}`, {
        method: "POST",
      }).then(() => setReloadData(reloadData + 1)); //RELOAD DATA
    }
  };

  const handleAnimateRefreshBtn = () => {
    anime({
      targets: ".refreshIcon",
      rotate: {
        value: [0, 360],
      },

      duration: 2000,
    });
  };

  return (
    <>
      <RefreshIcon
        className="refreshIcon"
        onClick={(e) => {
          setReloadData(reloadData + 1);
          handleAnimateRefreshBtn();
        }}
        // style={{ position: "fixed", top: "1%", left: "97%", cursor: "pointer" }}
      />
      <div className="app">
        <div className="addTask">
          <form onSubmit={handleAddTask} formMethod="POST">
            <h1> Add task</h1>
            <TextField
              id="standard-basic"
              label="Insert your task"
              autoComplete='off'
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

        <Tasks
          tasks={tasks}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleDelete={handleDeleteTask}
        />
      </div>
    </>
  );
}

export default App;
