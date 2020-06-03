import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
constructor(props){
    super(props);
    this.state = {Email: '', Password: '', redirect: false}

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);


}

handleEmail(event) {
    this.setState({Email: event.target.value})
}

handlePassword(event) {
    this.setState({Password: event.target.value})
}

handleSubmit(event) {

    const data = {
        email: this.state.Email,
        password: this.state.Password
    }
    
    axios.post('http://127.0.0.1:8000/api/login', data)
    .then((res) => {
        localStorage.setItem('user_id', res.data.id);
        localStorage.setItem('user_auth', res.data.auth_key);
        this.props.handleAuthChecker(true);

        this.setState({redirect: true})
    }).catch((err) => {
        alert(err);
    })

    event.preventDefault();

}

    render() {
        return (
            <div className="auth-inner">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.Email} onChange={this.handleEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.Password} onChange={this.handlePassword}/>
                    </div>


                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <Link to="/forget-password">password?</Link>
                    </p>

                    {this.state.redirect ? <Redirect push to="/dashboard" /> : ''}
                </form>
            </div>
        );
    }
}