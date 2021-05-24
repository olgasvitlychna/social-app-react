import React, { useState, useEffect } from 'react';
import './SignUp.css';


function SignUp(props) {


    const [username, setUsername] = useState(props.value)
    
    const onStatusChange = (event) => {
        setUsername(event.target.value)
    }
    // useEffect( () => {
    //     setUsername(props.value)
    // },[props.value])
    console.log(username)

    const [usernameErrors, setUsernameErrors] = useState(false)
        if(username === 'a'){
            setUsernameErrors(true)
        }
    const [emailErrors, setEmailErrors] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState(false)
    const [confirmationPasswordErrors, setConfirmationPasswordErrors] = useState(false)
    return (
        <div className='sign-up-page'>
            <div className='signUp-container'>
                <h2>Sign Up</h2>
                <form action="">
                    <input type="text" value={username} onChange={onStatusChange} placeholder='Username' />
                    {usernameErrors &&
                        <div className='errors'><span>*Username must contain at least 4 characters</span></div>

                    }
                    <input type="text" placeholder='Email' />
                    {emailErrors &&
                        <div className='errors'><span>enter correct Email</span></div>

                    }
                    <input type='password' placeholder='Password' />
                    {passwordErrors &&
                        <div className='errors'>
                            <ul>
                                <li>*Enter Your password</li>
                                <li>*Password must contain at least 6 characters</li>
                                <li>*Password must contain at least one number</li>
                                <li>*Password must contain at least one special character (! # @ $ %)</li>
                            </ul>
                            {/* <span>Password must contain at least 6 characters</span> */}
                        </div>

                    }
                    <input type="password" placeholder='Confirm password' />
                    {confirmationPasswordErrors &&
                        <div className='errors'><span>*Password confirmation must match Password</span></div>

                    }

                    <button>Sign Up</button>
                </form>

            </div>
        </div>
    )
}

export default SignUp;