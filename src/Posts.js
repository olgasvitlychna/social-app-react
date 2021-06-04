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
    const user = JSON.parse(localStorage.getItem('user'));
    const [logInUser, setLogInUser] = useState(false)
    const [userPost, setUserPost] = useState([])
    const [error, setError] = useState(false)
    const [deletePostAgree, setDeletePostAgree] = useState(false)
    // console.log(lastPostDate)

    // __________________________LATESTS POSTS______________________________
    useEffect(() => {
        let axiosConfig;
        if (user) {
            setLogInUser(true)
            axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + user.jwt_token
                }
            };
        } else {
            axiosConfig = {

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            };
        }

        // console.log(axiosConfig)
        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            {},
            axiosConfig)
            .then((res) => {

                setPostsList(res.data);

                setLastPostDate(res.data[res.data.length - 1].created_at)

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }, [])

    // __________________DELETE POSTS_________________________
    
    const deletePostPopUp = () => {
        console.log(777)
        setDeletePostAgree(true)
    }

    const postsElements = postsList.map((post) => {
        // setLastPostDate(post.created_at)

        console.log(post.id)


        const deletePost = (e) => {
            e.preventDefault()

            let axiosConfig;
            if (user) {

                axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + user.jwt_token
                    }
                };
            }

            // console.log(axiosConfig)
            axios.post(
                'https://akademia108.pl/api/social-app/post/delete',
                {
                    post_id: post.id
                },
                axiosConfig)
                .then((res) => {
                    // setUserPost(res.data.post.content)
                    // setPostsList(newPosts.unshift(res.data.post.content));

                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                    setError(true)
                })
        }

        return (

            <div className="postsContainer" key={post.id}>
                <div className='usersInformation'>

                    <div className="avatar">
                        <img className="avatarImg" src={post.user.avatar_url} alt={post.user.username} />
                    </div>
                    {!user &&
                        <span className='userName'>{post.user.username}</span>

                    }

                    {user && user.username === post.user.username &&
                        <div>
                            <span className='userName'>You</span>
                            <span className='deletePost' onClick={deletePostPopUp}>X</span>
                        </div>
                    }
                    {user && user.username !== post.user.username &&
                        <span className='userName'>{post.user.username}</span>
                    }
                    <span className='postsData' >{post.timeAgo}</span>

                </div>
                <p className="post">{post.content}</p>
                <div className='like'>

                    <span> 123</span>
                </div>
                

            </div>

        );

    });


    // __________________________OLDER-THAN POSTS______________________________

    const scrollToEndOfPage = () => {
        setEndOfPage(true)

        let axiosConfig;
        if (user) {
            axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer' + user.jwt_token
                }
            };
        } else {
            axiosConfig = {

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            };
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/older-then',
            { date: lastPostDate },
            axiosConfig)
            .then((res) => {
                // console.log(res.data)
                setPostsList(newPosts.concat(res.data))

                setLastPostDate(res.data[res.data.length - 1].created_at)

                setLoading(false)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })


    }



    // window.onscroll = function () {

    //     if (document.documentElement.scrollHeight === (window.innerHeight + document.documentElement.scrollTop)) {
    //         scrollToEndOfPage()
    //         setLoading(true)
    //         // setEndOfPage(true)
    //     }
    // }

    // _____________________ADD USERS POSTS_______________
    const addPosts = (e) => {
        e.preventDefault()
        let axiosConfig;
        if (user) {

            axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + user.jwt_token
                }
            };
        }

        // console.log(axiosConfig)
        axios.post(
            'https://akademia108.pl/api/social-app/post/add',
            {
                date: lastPostDate,
                username: 'You',
                content: userPost
            },
            axiosConfig)
            .then((res) => {
                setUserPost(res.data.post.content)
                // setPostsList(newPosts.unshift(res.data.post.content));
                // console.log(res.data)
                setLastPostDate(res.data.created_at)


            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                setError(true)
            })
    }

    const onPostsChange = (event) => {
        setUserPost(event.currentTarget.value)

    }
    // __________________DELETE POSTS_________________________



    return (
        <div className="posts-page">
            {logInUser &&
                <form action="#" className='postsInput' onSubmit={addPosts}>

                    <textarea placeholder='Write your post here' onChange={onPostsChange} value={userPost}></textarea>
                    {error &&
                        <span className='error'>Post can not be empty</span>
                    }

                    <button>Add post</button>
                </form>
            }
            {postsElements}
            <button onClick={scrollToEndOfPage}>get More</button>
            {loading &&
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            }
            {deletePostAgree &&
                    <div className='agree-container'>
                        <p>Are you sure?</p>
                        <button className='yes' >Yes</button>
                        <button className='cancel' onClick={() => setDeletePostAgree(false)}>Cancel</button>
                    </div>
            }
        </div>
    )
}

export default Posts;