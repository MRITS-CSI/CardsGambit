import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import Options from "./Components/Options";
import Timer from "./Components/Timer";
import { Questions } from "./Utils/Questions";
const App = () => {
  let [index, setIndex] = useState(0);
  let [questions, setQuestions] = useState(Questions[index]);

  return (
    <div className="container">
      <Question question={questions} />
      <Timer />
      <Options
        question={questions}
        setQuestion={setQuestions}
        allQuestions={Questions}
        index={index}
        setIndex={setIndex}
      />
    </div>
  );
};

export default App;
