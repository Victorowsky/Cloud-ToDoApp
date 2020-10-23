import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Tasks.css";
const Tasks = ({ tasks, handleDelete }) => {
  const createTask = tasks.map((task, index) => {
    const style = task.userData.important
      ? {
          border: "2px solid red",
        }
      : {};
    return (
      <li
        onClick={handleDelete}
        data-index={task._id}
        key={index}
        style={style}
      >
        <p data-index={task._id}>
          {index + 1}.{task.userData.text}
        </p>
        <DeleteForeverIcon
          onClick={handleDelete}
          data-index={task._id}
          style={{ position: "relative", right: "2%" }}
        />
      </li>
    );
  });

  return (
    <div className="taskList">
      <h2>Aktualne zadania</h2>
      <ul>{createTask}</ul>
    </div>
  );
};

export default Tasks;
