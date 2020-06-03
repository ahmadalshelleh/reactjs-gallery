import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {FName: '', LName: '', Email: '', Password: '', passwordValidation: '', success: ''}

        this.handleFName = this.handleFName.bind(this);
        this.handleLName = this.handleLName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleFName = event => {
        this.setState({FName: event.target.value})
    }

    handleLName = event =>{
        this.setState({LName: event.target.value})
    }

    handleEmail = event =>{
        this.setState({Email: event.target.value})
    }

    handlePassword = event =>{
        this.setState({Password: event.target.value})
    }

    Validation = () => {
        if(this.state.Password.length < 8){
            this.setState({passwordValidation: 'Must Be More than 8 characters'})
            return false;
        }

        this.setState({passwordValidation: ''})
        return true;
    }

    handleSubmit = event =>{

        if(this.Validation()){

        const data = {
            first_name: this.state.FName,
            last_name: this.state.LName,
            email: this.state.Email,
            password: this.state.Password 
        }

        axios.post('http://127.0.0.1:8000/api/register', data)
        .then((res) => {
            if(res.data.success == "Used Email"){
                this.setState({success: res.data.success})
            }else{
                this.setState({FName: '', LName: '', Email: '', Password: '', success: res.data.success})
            }
        })
    }

        event.preventDefault();
    
    }

    render() {
        return (
            <div className="auth-inner">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>
                    <div style={{fontSize: 12, color: "green"}}>{this.state.success}</div>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" value={this.state.FName} onChange={this.handleFName}/>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" value={this.state.LName} onChange={this.handleLName}/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.Email} onChange={this.handleEmail}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <div style={{fontSize: 12, color: "red"}}>{this.state.passwordValidation}</div>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.Password} onChange={this.handlePassword}/>
                    </div>

                    <input type="submit" value="Sign Up" className="btn btn-primary btn-block" />
                    <p className="forgot-password text-right">
                        Already registered <Link to="/sign-in">sign in?</Link>
                    </p>
                </form>
            </div>
        );
    }
}