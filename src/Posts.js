import React, {useState, useEffect } from 'react';
import './Posts.css'
import axios from 'axios'

import Postslist from './Postslist'
function Posts() {
    const [postsList, setPostsList] = useState();
    
    useEffect(() => {




        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        };

        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            {},
            axiosConfig)
            .then((res) => {
                // console.log(res.data);
                const tickers = res.data;

                let newPosts = []
                for (const [ticker, postsContent] of Object.entries(tickers)) {
                    let newPostsObj = {
                        postsInf: ticker,
                        content: postsContent.content,
                        created_at: postsContent.created_at,
                        userName: postsContent.user.username,
                        userAvatar: postsContent.user.avatar_url
                        // lastPost: postsContent.
                    }
                    newPosts.push(newPostsObj);

                }
                // console.log(newPosts)
                return(
                    setPostsList(newPosts)
                )


            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    })
    
    console.log(postsList)
    return (
        <div className="posts-page">
            <Postslist postsList={postsList}/>
            {/* <div className="postsContainer">
                <div className='usersInformation'>
                    <span className='userName'>Olga</span> <span className='postsData' >1 day ago</span>
                </div>
                <p className="post">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore ipsum libero cupiditate minus odio magni numquam quas, quae dolores facere sed eum cum dolor vitae? Ea distinctio atque nam adipisci!</p>
                <div className='like'>

                    <span> 123</span>
                </div>
            </div> */}

        </div>
    )
}

export default Posts;