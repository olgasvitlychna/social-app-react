import React, { useState, useEffect } from 'react';
import './Posts.css'
import axios from 'axios'

// import timeAgo from '../utils/DateUtils';

function Posts() {
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newPosts, setNewPosts] = useState([]);
    const [endOfPage, setEndOfPage] = useState(false);
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

                setPostsList(res.data)

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }, [])

    const postsElements = postsList.map((post) => {


        return (

            <div className="postsContainer" key={post.id}>
                <div className='usersInformation'>
                    <div className="avatar">
                        <img className="avatarImg" src={post.user.avatar_url} alt={post.user.username} />
                    </div>
                    <span className='userName'>{post.user.username}</span>
                    <span className='postsData' >{post.timeAgo}</span>
                </div>
                <p className="post">{post.content}</p>
                <div className='like'>

                    <span> 123</span>
                </div>

            </div>

        );

    });

    const scrollToEndOfPage = () => {
        console.log('scroll')
        
    }

    
    window.onscroll = function () {

        if (document.documentElement.scrollHeight === (window.innerHeight + document.documentElement.scrollTop)) {
            scrollToEndOfPage()
            setLoading(true)

        }
    }
    return (
        <div className="posts-page">

            {postsElements}

            {loading &&
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            }
            

        </div>
    )
}

export default Posts;