import React,{useState} from 'react';
import {
    
    Link
} from "react-router-dom";
import './Navigations.css'
import axios from 'axios'

function Navigation(props) {
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const logout = (e) => {
        e.preventDefault();
        
        let logoutUserData = {
            username: props.user,
            jwtToken: props.user.jwt_token
        };
        console.log(logoutUserData);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer' + '<jwtToken>'
            }
        };
        
        axios.post(
                'https://akademia108.pl/api/social-app/user/logout', 
                logoutUserData, 
                axiosConfig)
            .then((res) => {
                console.log(res.data)
    
                localStorage.setItem('user', JSON.stringify(res.data));
                props.setUser(res.data);
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
                        {props.user && <li><Link onClick={logout}>Logout</Link></li>}
                    </ul>
                </nav>
                
            </header>
        
    )
}

export default Navigation;