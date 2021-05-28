import React from 'react';
import {
    
    Link
} from "react-router-dom";
import './Navigations.css'


function Navigation(props) {

    const logout = (e) => {
        e.preventDefault();
        console.log('Wyloguj');
        /* Tutaj zapytanie wylogowujÄce usera */
    }

    return (
        
            <header className="App-header">
                <nav>
                    <ul>
                        <li><Link to='/posts'>Posts</Link></li>
                        {!props.user && <li><Link to='/login'>Login</Link></li>}
                        {!props.user &&  <li><Link to='/signUp'>Sign Up</Link></li>}
                        {props.user && <li><Link onClick={logout}>Logout</Link></li>}
                    </ul>
                </nav>
                
            </header>
        
    )
}

export default Navigation;