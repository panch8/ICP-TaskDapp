import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Heading from "./heading";
import Homework from "./homework";
import CreateArea from "./createArea";

import { homeworkApp_backend } from "../../../declarations/homeworkApp_backend/index";

function App() {
  const [homeWork, setHomeWork] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const homeworkArr = await homeworkApp_backend.getAllHomework();
    setHomeWork(homeworkArr);
  }

  // done deletion
  async function handleDelete(id) {
    setHomeWork((prev) => prev.splice(id, 1) && [...prev]);
    await homeworkApp_backend.deleteHomework(id);
  }

  async function handleMark(id) {
    await homeworkApp_backend.markAsCompleted(id);
    setHomeWork((prev) => {
      [...prev];
    });
  }

  function handleModifyHw(id) {
    const newHomework = {
      title: "proba",
      description: "ndo",
      dueDate: 100,
      completed: true,
    };
    setHomeWork((prev) => prev.splice(id, 1, newHomework) && [...prev]);
    homeworkApp_backend.updateHomework(
      id,
      newHomework.title,
      newHomework.description,
      newHomework.dueDate,
      newHomework.completed
    );
  }

  return (
    <div>
      <Heading />

      <CreateArea setHomeWork={setHomeWork} />

      {homeWork.map((homeWork, index) => (
        <Homework
          key={index}
          id={index}
          title={homeWork.title}
          description={homeWork.description}
          duedate={homeWork.dueDate}
          completed={homeWork.completed}
          onClicDel={handleDelete}
          onClicMark={handleMark}
          onSubmitModify={handleModifyHw}
        />
      ))}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
