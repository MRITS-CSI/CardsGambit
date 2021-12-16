import React, { useState } from 'react';
import '../CSS/Login.css';
import csi from '../Assets/csi.png';
import { checkLogin } from '../Utils/LoginHandler';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-md-2"></div>
					<div className="col-lg-6 col-md-8 login-box">
						{/* <div className="col-lg-12 login-key">
                        <i className="fa fa-key" aria-hidden="true"></i>
                    </div> */}
						<img src={csi} width="150px" height="150px" alt="img" />
						<div className="col-lg-12 login-title">
							Computer Society of India
						</div>

						<div className="col-lg-12 login-form">
							<div className="col-lg-12 login-form">
								<form>
									<div className="form-group">
										<label className="form-control-label">TEAM ID</label>
										<input
											type="text"
											className="form-control"
											onChange={(e) => setUsername(e.target.value)}
										/>
									</div>
									<div className="form-group">
										<label className="form-control-label">PASSWORD</label>
										<input
											type="password"
											className="form-control"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>

									<div className="col-lg-12 loginbttm">
										<div className="col-lg-6 login-btm login-text"></div>
										<div className="col-lg-6 login-btm login-button">
											<button
												className="btn btn-outline-primary"
												onClick={(e) => {
													e.preventDefault();

													checkLogin(username, password);
												}}
											>
												LOGIN
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-lg-3 col-md-2"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
