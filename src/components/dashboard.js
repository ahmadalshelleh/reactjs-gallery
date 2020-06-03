import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import Sidebar from './sidebar';
import Profile from './profile';
import Images from './images';

export default class index extends Component{
    constructor(props){
        super(props);
        
    }


    render() {
        return (
                <div className="auth-inner-dash">
                    
                    <div className="wrapper">
                        <Sidebar />
                        <div id="content">
                        Dashboard

                    </div>
                    </div>


                </div>
        );
    }
}