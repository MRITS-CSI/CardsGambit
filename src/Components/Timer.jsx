import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { nextQuestion } from '../actions';
import API from '../apis/API';
const Timer = (props) => {
	// let [initTime, setInitTime] = useState(moment(new Date(Date.now())));
	// let [finalTime, setFinalTime] = useState(
	// 	moment(new Date(Date.now())).add(10, 'seconds')
	// );
	let [diff, setDiff] = useState(null);

	// useEffect(() => {
	// 	setInitTime(moment(new Date(Date.now())));
	// }, [finalTime]);
	let finalTime = moment(new Date(Date.now())).add(7, 'minute');

	useEffect(() => {
		setTimeout(async () => {
			try {
				if (window.sessionStorage.getItem('jwt')) {
					let { data } = await API.patch('/user', {
						jwt: window.sessionStorage.getItem('jwt'),
						score: props.score,
					});
					data.status === 'ok' && alert('Form Submitted Successfully');
					data.status || alert(data.message);
					window.sessionStorage.removeItem('jwt');
					window.location.pathname = '/';
				} else {
					alert('Error !!! , Contact CSI Team ASAP !!!');
				}
			} catch (err) {
				alert(err.message);
			}
		}, 5 * 1000);

		const timer = setInterval(() => {
			setDiff(
				moment(finalTime.diff(moment(new Date(Date.now())))).format('mm:ss')
			);

			//	alert('Timer reset');
		}, 1000);

		return () => clearInterval(timer);
		//	 ;
	}, []);

	//	console.log(moment(moment(finalTime).diff(moment(new Date(Date.now())))).format('s'));

	return (
		<div id="timer">
			<p id="time">{diff}</p>
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
export default connect(mapStateToProps, { nextQuestion })(Timer);
