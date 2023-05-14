import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
// import { dKeeper_backend } from "../../../declarations/dKeeper_backend";
import { homeworkApp_backend } from "../../../declarations/homeworkApp_backend/index";

function CreateArea(props) {
  const [homeworkObj, setHomeworkObj] = useState({
    title: "",
    description: "",
    dueDate: Date.now(),
    completed: false,
  });
  const [init, setInit] = useState(true);

  function handleInitClick() {
    setInit(!init);
  }

  //done handlechange
  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, "ISISI", value);
    setHomeworkObj((prev) => {
      return { ...prev, [name]: value };
    });
  }
  ///. DONE add item and show.

  function addItem(e) {
    props.setHomeWork((prev) => [homeworkObj, ...prev]);
    homeworkApp_backend.addHomework(
      homeworkObj.title,
      homeworkObj.description,
      homeworkObj.dueDate,
      homeworkObj.completed
    );
    e.preventDefault();
    setHomeworkObj({
      title: "",
      description: "",
      dueDate: Date.now(),
      completed: false,
    });
  }

  return (
    <div>
      <form>
        <input
          hidden={init}
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={homeworkObj.title}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={init ? "1" : "3"}
          onChange={handleChange}
          value={homeworkObj.description}
          onClick={handleInitClick}
        />
        <div>
          <label htmlFor="completed" hidden={init}>
            Completed?
          </label>
          <input
            hidden={init}
            type="checkbox"
            name="completed"
            id="completed"
          />
        </div>
        <div>
          <label htmlFor="duedate" hidden={init}>
            due Date
            <input
              hidden={init}
              type="date"
              name="duedate"
              onChange={handleChange}
              value={homeworkObj.dueDate}
            />
          </label>
        </div>
        <button hidden={init} onClick={addItem}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
