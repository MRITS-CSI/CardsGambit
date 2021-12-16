import API from '../apis/API';
import * as _ from 'lodash';
export const nextQuestion = (index) => {
	// Return an action
	return {
		type: 'NEXT',
		payload: index,
	};
};

export const getQuestions = () => async (dispatch, _getState) => {
	let arr = ['SPADE', 'HEART', 'CLOVER', 'DIAMOND'];
	let val = _.sampleSize(arr, 2);
	let data1 = await API.get(`/cards/${val[0]}`);
	let data2 = await API.get(`/cards/${val[1]}`);
	let data = [...data1.data, ...data2.data];
	console.log(data);
	dispatch({ type: 'FETCH_QUES', payload: data });
};

export const setScore = (score) => {
	return {
		type: 'SCORE',
		payload: score,
	};
};
