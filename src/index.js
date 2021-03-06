import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Account from './components/Account/Account';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line no-unused-vars
import app from './firebase'
import { getAuth } from 'firebase/auth';
import { BrowserRouter as Router, Route, Link, Routes as Switch } from 'react-router-dom';


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null }
    this.logOutUser = this.logOutUser.bind(this);

  }
  componentDidMount() {
    const auth = getAuth();

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    })
  }
  logOutUser = () => {
    getAuth().signOut()
      .then(window.location = "/");
  }
  render() {
    return (

      <Router>
        <div className="app">
          <div className="main-nav">
            {!this.state.user &&
              <div className ="right">
                <Link className = "Link1"to="/login">Logar</Link>
                <Link  className = "Link1" to="/register">Cadastrar-se</Link>
              </div>
            }

            {this.state.user &&
              <div className = "right">
                <a className = "Link1"href="#!" onClick={this.logOutUser}>Sair</a>
                <Link className ="Link1"to="/accout">Conta</Link>
              </div>
            }
          </div>
          <Switch>
            <Route path="/" element={<Home user={this.state.user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/accout" element={ <Account></Account>} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Rota invalida</p>
                </main>
              }
            />
          </Switch>
        </div>
      </Router>
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
