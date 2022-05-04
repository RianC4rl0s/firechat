// /components/Auth/Register.js
import React from 'react';
// eslint-disable-next-line no-unused-vars
import app from '../../firebase.js'
import { Link } from 'react-router-dom';
import './Auth.css';
// import Login from './Login';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
// 	apiKey: "AIzaSyAqr3s1KDjJOnmWGaD_fRkOL62V4FXbOlc",
// 	authDomain: "firechat-79b8b.firebaseapp.com",
// 	projectId: "firechat-79b8b",
// 	storageBucket: "firechat-79b8b.appspot.com",
// 	messagingSenderId: "209700885076",
// 	appId: "1:209700885076:web:b88c61eabe55f0e33e93c1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			hasUser: null,
			error: null
		}
	}
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit = e => {
		e.preventDefault();
		const auth = getAuth();
		const { email, password } = this.state;

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {

				let hasUser = true;
				this.setState({ hasUser })

			})
			.catch(error => {
				this.setState({ error });
			});
	}
	render() {
		const { email, password, error, hasUser } = this.state;
		return (
			
				<div className="auth--container">
					<h3>Realizar login</h3>
					{error && <p className="error-message">{error.message}</p>}
					<form onSubmit={this.handleSubmit}>

						<label className="container1" htmlFor="email"> Email: </label><br/>
						<input className="container1" type="text" name="email" id="email" value={email} onChange={this.handleChange} /><br/>
						<label className="container1" htmlFor="password"> Senha: </label><br/>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={this.handleChange}
						/><br/>
						<button className="bnt-success" children="Logar" />
						<p>Não possui uma conta ?  <Link to="/register">Criar conta</Link></p>
					</form>
					{hasUser && (
						<Navigate to="/" replace={true} />
					)}
				</div>
			
		);
	}
}
export default Register;