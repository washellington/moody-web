import React from "react";

import Journal from "./Journal/Journal";
import { useMediaQuery } from "react-responsive";
import AddEmotionEntry from "./AddEmotionEntry/AddEmotionEntry";
import LogMoodForm from "./LogMoodForm/LogMoodForm";
import NavBar from "./NavBar/NavBar";

const LogMoodPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <>
      {isMobile && <LogMoodForm />}
      {!isMobile && (
        <>
          <NavBar />
          <Journal />
          <AddEmotionEntry open={true} />
        </>
      )}
    </>
  );
};

export default LogMoodPage;
