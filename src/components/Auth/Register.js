// /components/Auth/Register.js
import React from 'react';
// eslint-disable-next-line no-unused-vars
import app from '../../firebase.js'
import { Link } from 'react-router-dom';
import './Auth.css';
// import Login from './Login';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
// import { initializeApp } from "firebase/app";

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
				<h3>Registre uma nova conta</h3>
				{error && <p className="error-message">{error.message}</p>}
				<form onSubmit={this.handleSubmit}>
					<label className= "container1" htmlFor="username">Usuario</label><br/>
					<input className= "container1" type="text" name="username" id="username" value={username} onChange={this.handleChange} /><br/>
					<label className= "container1"  htmlFor="email">Email </label><br/>
					<input type="text" name="email" id="email" value={email} onChange={this.handleChange} /><br/>
					<label className= "container1" htmlFor="password">Senha</label><br/>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={this.handleChange}
					/><br/>
					<button className="bnt-success" children="Criar conta" />
					<p>Já possui uma conta ? <Link className="login-btn" to="/login">Logar aqui</Link></p>
				</form>
				{hasUser && (
					<Navigate to="/" replace={true} />
				)}
			</div>
		);
	}
}
export default Register;