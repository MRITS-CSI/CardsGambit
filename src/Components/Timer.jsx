import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { nextQuestion } from "../actions";
import API from "../apis/API";
const Timers = (props) => {
  // let [initTime, setInitTime] = useState(moment(new Date(Date.now())));
  // let [finalTime, setFinalTime] = useState(
  // 	moment(new Date(Date.now())).add(10, 'seconds')
  // );
  let [diff, setDiff] = useState(0);

  // useEffect(() => {
  // 	setInitTime(moment(new Date(Date.now())));
  // }, [finalTime]);

  useEffect(() => {
    let finalTime = moment().add(30, "seconds");

    const timeout = setTimeout(async () => {
      try {
        if (props.index < props.questions.length) {
          return props.nextQuestion(props.index);
        } else {
          if (window.sessionStorage.getItem("jwt")) {
            let { data } = await API.patch("/user", {
              jwt: window.sessionStorage.getItem("jwt"),
              score: `${props.score}`,
            });
            data.status === "ok" && alert("Form Submitted Successfully");
            data.status || alert(data.message);

            window.location.pathname = "/";
            window.sessionStorage.removeItem("jwt");
          } else {
            alert("Error !!! , Contact CSI Team ASAP !!!");
          }
        }
      } catch (err) {
        alert(err.message);
      }
    }, 30 * 1000);

    const timer = setInterval(() => {
      setDiff(moment(finalTime - moment().subtract(30, "minutes")));
      // console.log(props);
      //	alert('Timer reset');
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
      return;
    };
    //	 ;
  }, [props]);

  //	console.log(moment(moment(finalTime).diff(moment(new Date(Date.now())))).format('s'));

  return (
    <div id="timer">
      <p id="time">{moment(diff).format("ss")}</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    index: state.qIndex,
    score: state.score,
    questions: state.questions,
  };
};
export default connect(mapStateToProps, { nextQuestion })(Timers);
