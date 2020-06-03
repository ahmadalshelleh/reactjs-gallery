import React, { Component } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';

export default class index extends Component{
    constructor(props){
        super(props);

        this.state = {success: '', first_name: '', last_name: '', email: '', password: '', passwordValidation: '', success: ''}
        
        this.handleFName = this.handleFName.bind(this);
        this.handleLName = this.handleLName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

    }

    handleFName = (event) => {
        this.setState({first_name: event.target.value})
    }

    handleLName = (event) => {
        this.setState({last_name: event.target.value})
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value})
    }

    Validation = () => {
        if(this.state.password.length > 0){
            if(this.state.password.length < 8){
                this.setState({passwordValidation: 'Must Be More than 8 characters'})
                return false;
            }
        }

        this.setState({passwordValidation: ''})
        return true;
    }

    handleSubmit = (event) => {

        if(this.Validation()){
            const data = {
                user_id: localStorage.getItem('user_id'),
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
            }

            if(this.state.password.length > 0){
                data.password = this.state.password
            }

            axios.post('http://127.0.0.1:8000/api/updateUser', data, {
                headers: {
                    user_auth: localStorage.getItem('user_auth')
                }
            })
            .then((res) => {
                this.setState({success: 'Updated successfully'})
            })
            .catch((err) => {
                console.log(err);
            })
        }
        event.preventDefault();
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/getUser',{
            params: {
                user_id: localStorage.getItem('user_id')
            },
            headers: {
                user_auth: localStorage.getItem('user_auth')
            }
        })
        .then((res) => {
            this.setState({first_name: res.data.success.first_name})
            this.setState({last_name: res.data.success.last_name})
            this.setState({email: res.data.success.email})
        })
        .catch((err) => {
            console.log(err);
        })

    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        return (
            <div className="auth-inner-dash">
                    
                <div className="wrapper">
                    <Sidebar />

                    <div id="content" className="profile-style">
                        <form onSubmit={this.handleSubmit}>
                            <h4>Profile</h4>
                            <div style={{fontSize: 12, color: "green"}}>{this.state.success}</div>
                            <label>First Name</label>
                            <input type="text" className="form-control" value={this.state.first_name} onChange={this.handleFName}/>
                            <label>Last Name</label>
                            <input type="text" className="form-control" value={this.state.last_name} onChange={this.handleLName}/>
                            <label>Email</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmail}/>
                            <label>Password</label>
                            <div style={{fontSize: 12, color: "red"}}>{this.state.passwordValidation}</div>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword}/>
                            <br />
                            <input type="submit" className="btn btn-primary" value="Save Images" />
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}