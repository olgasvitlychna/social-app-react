import React, { useState, useEffect } from 'react';
import './Posts.css'
import axios from 'axios'
import TimeAgo from 'timeago-react'
// import timeAgo from '../utils/DateUtils';

function Posts() {
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newPosts, setNewPosts] = useState([]);
    const [lastPostDate, setLastPostDate] = useState('');
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

                setPostsList(res.data);


            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }, [])

    const postsElements = postsList.map((post) => {
        // setLastPostDate(post.created_at)
        // console.log(post)




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
        setEndOfPage(true)
        
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
                console.log(res.data)
                setNewPosts(res.data)

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    
}
    const olderThanPosts = newPosts.map((post) => {
        return(
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
        )
    })


    window.onscroll = function () {

        if (document.documentElement.scrollHeight === (window.innerHeight + document.documentElement.scrollTop)) {
            scrollToEndOfPage()
            setLoading(true)
            // setEndOfPage(true)
        }
    }
    return (
        <div className="posts-page">

            {postsElements}

            {loading &&
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            }
            {/* {endOfPage && */}
                {olderThanPosts}
            {/* } */}

        </div>
    )
}

export default Posts;