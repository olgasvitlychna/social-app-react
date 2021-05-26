import React from 'react';
import './PopUp.css';

import {
   
    Link
} from "react-router-dom";

function PopUp(props) {
    
    
    
    return(
        
        <div className='form-container'>
            <h2>Please log in <span onClick={() => props.closeModal(false)}>X</span></h2>
            <form action="">
            <input type="text" placeholder='Username' />
            <input type="password" className='password' placeholder='Password' />
            
            <button>log in</button>
            </form>
            
                <p>Dont have an account?<Link to='/signUp'>Sign Up</Link></p>
           
        </div>
    )
}

export default PopUp;