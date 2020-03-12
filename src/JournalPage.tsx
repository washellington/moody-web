import React from "react";
import NavBar from "./NavBar/NavBar";
import "react-calendar/dist/Calendar.css";
import AddEmotionEntry from "./AddEmotionEntry/AddEmotionEntry";
import Journal from "./Journal/Journal";

const JournalPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Journal />
    </>
  );
};

export default JournalPage;
