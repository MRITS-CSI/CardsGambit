import React from "react";

const Options = ({ question, setQuestion, allQuestions, index, setIndex }) => {
  const nextButtonHandler = (e) => {
    if (index < allQuestions.length) {
      setQuestion(allQuestions[index + 1]);
      setIndex(index++);
      //  setQuestion(allQuestions[index]);
    }
  };

  const options = question.answers.map((el) => {
    return (
      <button className="learn-more" id="option1" value={el}>
        {el.toUpperCase()}
      </button>
    );
  });

  return (
    <div id="option">
      {options}
      {/*<button className="learn-more" id="option1" value="1"></button>
      // <button className="learn-more" id="option2" value="2"></button>
      // <button className="learn-more" id="option3" value="3"></button>
      // <button className="learn-more" id="option4" value="4"></button>
  */}
      <div id="controls">
        {/*<button className="previous" id="prev">
          Previous Card
  </button>*/}

        {index < allQuestions.length ? (
          <button
            className="next"
            id="nex"
            onClick={(e) => nextButtonHandler(e)}
          >
            Next Card
          </button>
        ) : (
          <button
            className="next"
            id="submit"
            onClick={() => alert("Submitting your request")}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
export default Options;
