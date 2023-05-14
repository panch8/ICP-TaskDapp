import React from "react";
import { useState } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CardTravel from "@material-ui/icons/CardTravel";
import {
  Create,
  OutlinedFlag,
} from "../../../../node_modules/@material-ui/icons/index";

function Homework(props) {
  const [homeworkObj, setHomeworkObj] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    completed: false,
  });
  //done handlechange
  function handleChange(event) {
    const { name, value } = event.target;
    setHomeworkObj((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleDel() {
    props.onClicDel(props.id);
  }

  function toggleView(classKey) {
    const popUp = document.querySelectorAll(classKey);
    const popUpList = Array.from(popUp);
    popUpList[props.id].toggleAttribute("hidden");
  }

  function handleViewOpt() {
    toggleView(".homeworkPlus");
  }

  function handleModify() {
    toggleView(".homeworkModify");
  }

  function handleMarkasCompleted() {
    props.onClicMark(props.id);
  }

  console.log(props.completed);
  console.log(+`${props.duedate}`);
  return (
    <div className={`homework ${props.completed ? "completed" : ""}`}>
      <h1>{props.title} </h1>
      <p>{props.description}</p>
      <div
        data-index={props.id}
        className="homeworkPlus homework"
        hidden={true}
      >
        <p>{+`${props.duedate}`}</p>
        <p>{props.completed}</p>
      </div>

      <form
        data-index={props.id}
        className="homeworkModify homework"
        hidden={true}
      >
        <h3>Wanna Modify?</h3>
        <div>
          <label htmlFor="title">Chge title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="here"
            value={homeworkObj.title}
          />
          <label htmlFor="description">Chge descrip</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="here"
            value={homeworkObj.description}
          />
          <label htmlFor="description">Chge Date</label>
          <input
            type="number"
            name="duedate"
            onChange={handleChange}
            placeholder="here"
          />
        </div>
      </form>

      <button title="Delete" onClick={handleDel}>
        <span>
          <DeleteOutlineIcon />
        </span>
      </button>

      <button title="View due Date" onClick={handleViewOpt}>
        <span>
          <CardTravel />
        </span>
      </button>

      <button title="Modify" onClick={handleModify}>
        <span>
          <Create />
        </span>
      </button>

      <button title="Mark as completed" onClick={handleMarkasCompleted}>
        <span>
          <OutlinedFlag />
        </span>
      </button>
    </div>
  );
}

export default Homework;
