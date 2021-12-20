import React, { useState } from "react";
import { connect } from "react-redux";
import { nextQuestion, setScore } from "../actions";
import API from "../apis/API";

const Options = (props) => {
  let [previous, setPrevious] = useState("option1");
  let [ans, setAns] = useState("");
  const nextButtonHandler = (e) => {
    document.getElementById(previous).style = "";
    //	console.log(props);
    if ([10, 11, 12, 25, 24, 23].includes(props.index)) {
      ans === props.questions[props.index].answer && props.setScore(3);
    } else {
      ans === props.questions[props.index].answer && props.setScore(1);
    }
    props.nextQuestion(props.index);
    //	console.log(props.index);
  };
  let question = props.questions[props.index];
  const optionHandler = (e) => {
    document.getElementById(previous).style = "";
    document.getElementById(e.target.id).style = "background: cyan;";
    setPrevious(e.target.id);
    setAns(e.target.value);
  };

  const submitHandler = async (e) => {
    try {
      if (window.sessionStorage.getItem("jwt")) {
        let { data } = await API.patch("/user", {
          jwt: window.sessionStorage.getItem("jwt"),
          score: props.score,
        });
        data.status === "ok" && alert("Form Submitted Successfully");
        data.status || alert(data.message);
        window.sessionStorage.removeItem("jwt");
        window.location.pathname = "/";
      } else {
        alert("Error !!! , Contact CSI Team ASAP !!!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const options = () => {
    if (question)
      return question.option.map((el, i) => {
        return (
          <button
            className="learn-more"
            id={`option${i + 1}`}
            value={el}
            onClick={optionHandler}
          >
            {el.toUpperCase()}
          </button>
        );
      });
    return null;
  };

  return (
    <div id="option">
      {options()}
      {/*<button className="learn-more" id="option1" value="1"></button>
      // <button className="learn-more" id="option2" value="2"></button>
      // <button className="learn-more" id="option3" value="3"></button>
      // <button className="learn-more" id="option4" value="4"></button>
  */}
      <div id="controls">
        {/*<button className="previous" id="prev">
          Previous Card
  </button>*/}

        {props.index < props.questions.length ? (
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
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    index: state.qIndex,
    questions: state.questions,
    score: state.score,
  };
};
export default connect(mapStateToProps, { nextQuestion, setScore })(Options);
