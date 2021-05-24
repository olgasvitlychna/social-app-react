import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Navigations.css'


function Navigation() {
    return (
        
            <header className="App-header">
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signUp'>Sign Up</Link></li>
                    </ul>
                </nav>
                
            </header>
        
    )
}

export default Navigation;