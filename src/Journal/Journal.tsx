import React from "react";
import NavBar from "../NavBar/NavBar";
import Calendar from "react-calendar";

const Journal: React.FC = () => {
  return (
    <>
      <NavBar />
      <div id="Journal">
        <Calendar />
      </div>
    </>
  );
};

export default Journal;
