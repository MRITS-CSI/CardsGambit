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
		if (props.questions[props.index]) {
			console.log(props.questions[props.index].cardType);

			return props.questions[props.index].question;
		}
		return '';
	};
	let card = () => {
		if (props.questions[props.index] && props.questions[props.index].cardType) {
			if (props.index > 13) {
				return require(`../Assets/${+props.index - 13}${props.questions[
					props.index
				].cardType.toLowerCase()}.png`);
			}
			return require(`../Assets/${+props.index + 1}${props.questions[
				props.index
			].cardType.toLowerCase()}.png`);
		}
		return require('../Assets/1spades.png');
	};

	return (
		<>
			<div class="flip-container" id="merlin">
				<div class="flip-card">
					<div class="front face">
						<img
							src={card()}
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
