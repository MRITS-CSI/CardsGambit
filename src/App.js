import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Question from './Components/Question';
// import Options from './Components/Options';
// import Timer from './Components/Timer';
import { checkToken } from './Utils/LoginHandler';

const App = () => {
	// let [index, setIndex] = useState(0);
	// let [questions, setQuestions] = useState(Questions[index]);
	let [loginStat, setLoginStat] = useState(false);

	useEffect(() => {
		let init = async () => {
			let token = window.sessionStorage.getItem('jwt');
			let val = await checkToken(token);
			setLoginStat(val);
		};
		init();
	});

	if (loginStat) {
		return (
			<div className="container">
				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<Login />}></Route>
						<Route path="/card" element={<Question />}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
	return <Login />;
};

export default App;
