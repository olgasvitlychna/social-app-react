import React, { useState, } from 'react';
import './SignUp.css';

import axios from 'axios';

function SignUp() {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [usernameErrors, setUsernameErrors] = useState(false)
    const [emailErrors, setEmailErrors] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState(false)
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState(false)

    const sendForm = (event) => {
        let isValid = true;
        event.preventDefault()

        if (username.search(/\s/) > 0 || username.length < 4) {
            setUsernameErrors(true)
            isValid = false
        } else {
            setUsernameErrors(false)
        }
        if (email.search(/\s/) > 0 || email.length === 0 || email.search(/@/) < 0) {
            setEmailErrors(true)
            isValid = false
        } else {
            setEmailErrors(false)
        }
        if (password === '' || password.search(/\d/) < 0 || password.search(/[!#@$%]/) < 1 ) {
            setPasswordErrors(true)
            isValid = false
        } else {
            setPasswordErrors(false)
        }
        if (confirmPassword !== password) {
            setConfirmPasswordErrors(true)
            isValid = false
        } else {
            setConfirmPasswordErrors(false)
        }
        if (isValid) {

            let newUser = {
                username: username,
                email: email,
                password: password,
            }

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

            axios.post(
                'http://akademia108.pl/api/social-app/user/signup',
                JSON.stringify(newUser),
                { 'headers': headers })
                .then((req) => {

                          
                    if(req.data.signedup === false){
                        let massageErr  = req.data.message.email
                        console.log(massageErr);
                    }else{
                        console.log(req.data);
                    }
                    
                    
                }).catch((error) => {
                    console.error(error);
                })
        }

    }



    return (
        <div className='sign-up-page'>
            <div className='signUp-container'>
                <h2>Sign Up</h2>
                <form onSubmit={sendForm}>
                    <input type="text" placeholder='Username' value={username} onChange={event => setUsername(event.target.value)} />
                    {usernameErrors &&
                        <div className='errors'><span>*Username must contain at least 4 characters</span></div>

                    }
                    <input type="text" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
                    {emailErrors &&
                        <div className='errors'><span>enter correct Email</span></div>

                    }
                    <input type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
                    {passwordErrors &&
                        <div className='errors'>
                            <ul>
                                <li>*Enter Your password</li>
                                <li>*Password must contain at least 6 characters</li>
                                <li>*Password must contain at least one number</li>
                                <li>*Password must contain at least one special character (! # @ $ %)</li>
                            </ul>

                        </div>

                    }
                    <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
                    {confirmPasswordErrors &&
                        <div className='errors'><span>*Password confirmation must match Password</span></div>

                    }

                    <button >Sign Up</button>
                </form>

            </div>
        </div>
    )
}

export default SignUp