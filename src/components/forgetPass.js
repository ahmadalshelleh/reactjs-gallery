import React, { Component } from 'react';

export default class login extends Component {
    render() {
        return (
            <div className="auth-inner">
                <form>
                    <h3>Forget Password</h3>
                    <div className="form-group">
                        <label>Enter Your Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        );
    }
}

