// /components/Auth/Register.js
import React from 'react';
import app from '../../firebase.js'
import { Link } from 'react-router-dom';
import './Auth.css';
import Login from './Login';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
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
			username: '',
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
		const { email, username, password } = this.state;

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				const user = auth.currentUser;

				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/firebase.User
					// ...
					updateProfile(auth.currentUser, {
						displayName: username
					}).then(() => {
						// Profile updated!
						// ...
						let hasUser = true;
						this.setState({ hasUser })
						// Navigate("/")
						// this.props.history.push('/')
					}).catch((error) => {
						// An error occurred
						// ...
						this.setState({ error })
					});
				} else {
					// No user is signed in.
				}
				// const user = getAuth().currentUser;
				// user
				// 	.updateProfile({ displayName: username })
				// 	.then(() => {
				// 		this.props.history.push('/');
				// 	})
				// 	.catch(error => {
				// 		this.setState({ error });
				// 	});
			})
			.catch(error => {
				this.setState({ error });
			});
	}
	render() {
		const { email, username, password, error, hasUser } = this.state;
		return (
			<div className="auth--container">
				<h1>Register your account</h1>
				{error && <p className="error-message">{error.message}</p>}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
					<label htmlFor="email">Email address</label>
					<input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
					<label htmlFor="password">Choose a password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={this.handleChange}
					/>
					<button className="general-submit" children="Get Started" />
					<p>Already have an account? <Link className="login-btn" to="/login">Login here</Link></p>
				</form>
				{hasUser && (
					<Navigate to="/" replace={true} />
				)}
			</div>
		);
	}
}
export default Register;