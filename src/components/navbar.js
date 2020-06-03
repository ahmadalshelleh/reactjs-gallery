import React, { Component } from 'react'
import logo from '../logo.svg';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

import Index from "./index";
import Login from "./login";
import SignUp from "./signup";
import Forget from './forgetPass';
import Dashboard from './dashboard';
import Profile from './profile';
import Images from './images';

export default class Navbar extends Component {
    constructor(props){
        super(props);

        this.state = {authChecker: false, counter: true}
    }

    handleAuthChecker = (value) => {
        this.setState({authChecker: value});
    }

    handleLogout = () => {
        this.setState({authChecker: false})
        localStorage.clear();
    }

    componentWillMount(){
        if(localStorage.getItem('user_id') && this.state.counter){
            this.setState({authChecker: true});
            this.setState({counter: false});
        }
    }
    
    render() {  
        return (
            <Router>
            <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                  <Link className="navbar-brand" to={"/"}>Gallery</Link>
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto ul-navbar">
                      <li className="nav-item li-navbar">
                        {this.state.authChecker ? <Link className="nav-link" to={"/dashboard"}>Dashboard</Link> : <Link className="nav-link" to={"/sign-in"}>Login</Link>}
                      </li>
                      <li className="nav-item li-navbar">
                        {this.state.authChecker ? <a href="" className="nav-link" onClick={this.handleLogout}>Logout</a> : <Link className="nav-link" to={"/sign-up"}>Sign up</Link>}
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
        
              <div className="auth-wrapper">
                  <Switch>
                    <Route exact path='/' component={Index} />
                    <Route path="/sign-in" render={ () => <Login handleAuthChecker={this.handleAuthChecker} />} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/forget-password" component={Forget} />
                    <Route path="/dashboard" component={Dashboard} >
                      {this.state.authChecker ? '' : <Redirect to="/" />}
                    </Route>
                    <Route path="/profile" component={Profile} >
                      {this.state.authChecker ? '' : <Redirect to="/" />}
                    </Route>
                    <Route path="/images" component={Images} >
                      {this.state.authChecker ? '' : <Redirect to="/" />}
                    </Route>
                  </Switch>
              </div>
            </div>
            </Router>
        )
    }
}
