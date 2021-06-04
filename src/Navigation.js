import React from 'react';
import {
    
    Link
} from "react-router-dom";
import './Navigations.css'
import axios from 'axios'

function Navigation(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    const logout = (e) => {
        e.preventDefault();
        
        let logoutUserData = {
            
        };
        console.log(logoutUserData);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer' + user.jwt_token
            }
        };
        
        axios.post(
                'https://akademia108.pl/api/social-app/user/logout', 
                logoutUserData, 
                axiosConfig)
            .then((res) => {
                console.log(res.data)
    
                localStorage.setItem('user', JSON.stringify(null));
                props.setUser(null);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    return (
        
            <header className="App-header">
                <nav>
                    <ul>
                        <li><Link to='/posts'>Posts</Link></li>
                        {!props.user && <li><Link to='/login'>Login</Link></li>}
                        {!props.user &&  <li><Link to='/signUp'>Sign Up</Link></li>}
                        {props.user && <li><button onClick={logout} className='logout-btn'>Logout</button></li>}
                    </ul>
                </nav>
                
            </header>
        
    )
}

export default Navigation;