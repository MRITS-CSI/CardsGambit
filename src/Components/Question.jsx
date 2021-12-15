import React from "react";

const Question = ({ question }) => {
  return (
    <div class="flip-container" id="merlin">
      <div class="flip-card">
        <div class="front face">
          <img
            src={require("../Assets/1spades.png")}
            width="200px"
            height="265px"
            id="card"
            alt="img"
          />
        </div>
        <div class="back face">
          <div id="question">{question.question}</div>
        </div>
      </div>
    </div>
  );
};
export default Question;
