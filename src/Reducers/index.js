import { combineReducers } from 'redux';

const questionIndexReducer = (index = 0, action) => {
	if (action.type === 'NEXT') {
		return action.payload + 1;
	}
	return index;
};

const fetchQuestionsReducer = (questions = [], action) => {
	if (action.type === 'FETCH_QUES') {
		return action.payload;
	}
	return questions;
};

const setScore = (score = 0, action) => {
	if (action.type === 'SCORE') {
		return score + action.payload;
	}
	return score;
};

export default combineReducers({
	qIndex: questionIndexReducer,
	questions: fetchQuestionsReducer,
	score: setScore,
});
