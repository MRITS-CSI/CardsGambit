import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../actions';
// import Options from './Options';
// import Timer from './Timer';

const Question = (props) => {
	useEffect(() => {
		//	ques = props.questions[props.index]['question'];
		//		console.log(props);
		props.getQuestions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let ques = () => {
		if (props.questions[props.index])
			return props.questions[props.index].question;
		return '';
	};
	return (
		<>
			<div class="flip-container" id="merlin">
				<div class="flip-card">
					<div class="front face">
						<img
							src={require('../Assets/1spades.png')}
							width="200px"
							height="265px"
							id="card"
							alt="img"
						/>
					</div>
					<div class="back face">{ques()}</div>
				</div>
			</div>
			
		</>
	);
};
const mapStateToProps = (state) => {
	//console.log(state);
	return { index: state.qIndex, questions: state.questions };
};
export default connect(mapStateToProps, { getQuestions })(Question);
