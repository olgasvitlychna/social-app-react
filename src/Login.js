import React, { useState } from 'react';
import './Login.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignUp from './SignUp'

function Login() {


    const [inputUsernameValue, setUsernameValue] = useState('')
    const [inputPasswordValue, setPasswordValue] = useState('')


    return (
        <div className="login-page">
            <div></div>
            <h2>Please log in </h2>
            <form action="">
                <input type="text" placeholder='Username' onChange={event => setUsernameValue(event.target.value)} />
                <input type="password" className='password' placeholder='Password' onChange={event => setPasswordValue(event.target.value)} />

                <button>log in</button>
            </form>
            <Router>
                <p>Dont have an account?<Link to='/signUp'>Sign Up</Link></p>


            </Router>
        </div>
    )
}

export default Login;