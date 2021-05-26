import React from 'react';
import './Posts.css'
// import axios from 'axios'
function Posts() {

   
    return(
        <div className="posts-page">
            <div className="postsContainer">
                <div className='usersInformation'>
                    <span className='userName'>Olga</span> <span className='postsData' >1 day ago</span>
                </div>
                <p className="post">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore ipsum libero cupiditate minus odio magni numquam quas, quae dolores facere sed eum cum dolor vitae? Ea distinctio atque nam adipisci!</p>
                <div className='like'>
                    
                    <span> 123</span>
                </div>
            </div>
            
        </div>
    )
}

export default Posts;