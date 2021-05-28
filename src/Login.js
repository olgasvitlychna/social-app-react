import React, { useState } from 'react';
import './Login.css';

import {

    Link
} from "react-router-dom";

import axios from 'axios';
// import SignUp from './SignUp'

function Login(props) {


    const [inputUsernameValue, setUsernameValue] = useState('');
    const [inputPasswordValue, setPasswordValue] = useState('');
   

    const sendLoginForm = (event) => {
        event.preventDefault()
        let postData = {
            username: inputUsernameValue,
            password: inputPasswordValue,
            ttl: 3600
        };
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': 'Bearer' + <jwtToken>
            }
        };
        
        axios.post(
                'https://akademia108.pl/api/social-app/user/login', 
                postData, 
                axiosConfig)
            .then((res) => {
                console.log(res.data);

                localStorage.setItem('user', JSON.stringify(res.data));
                props.setUser(res.data);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }
    


    return (
        <div className="login-page">
                <div></div>
                <h2>Please log in </h2>
                <form action="#" onSubmit={sendLoginForm}>
                    <input type="text" placeholder='Username' value={inputUsernameValue} onChange={event => setUsernameValue(event.target.value)} />
                    <input type="password" className='password' value={inputPasswordValue} placeholder='Password' onChange={event => setPasswordValue(event.target.value)} />

                    <button>log in</button>
                </form>

                <p>Dont have an account?<Link to='/signUp'>Sign Up</Link></p>



            </div>
    )
}

export default Login;