import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class sidebar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav id="sidebar">

                <ul className="list-unstyled components">
                    <li><Link to="/dashboard" className="nav-link sidebar-links">Dashboard</Link></li>
                    <li><Link to="/Profile" className="nav-link sidebar-links">Profile</Link></li>
                    <li><Link to="/images" className="nav-link sidebar-links">Add image</Link></li>
                </ul>

            </nav>
        );
    }
}