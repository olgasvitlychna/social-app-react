import React, { useState } from 'react'
import axios from 'axios'

export default function AddLike(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [like, setLike] = useState(props.postId.likes.length)
    const postId = props.postId.id
    const [handlelLike, setHandleLike] = useState(true)
    // console.log(props.postId.likes.length)

    const pressLikeButton = (e) => {

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
        if (handlelLike) {
            axios.post(
                ' https://akademia108.pl/api/social-app/post/like',
                {
                    post_id: postId
                },
                axiosConfig)
                .then((res) => {
                    // console.log(res.data.liked)
                    if (res.data.message === 'Like has been added' && res.data.liked === true) {
                        setLike(like + 1)
                        setHandleLike(false)
                    }
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }else{
            axios.post(
                ' https://akademia108.pl/api/social-app/post/dislike',
                {
                    post_id: postId
                },
                axiosConfig)
                .then((res) => {
                    // console.log(res.data.liked)
                    if (res.data.message === 'Like has been removed' && res.data.liked === false) {
                        setLike(like - 1)
                        setHandleLike(true)
                    }
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    }
    // console.log(props.postId.likes)



    // console.log(axiosConfig)



    return (

        <div className='like' onClick={pressLikeButton}>

            <span> {like} </span>
        </div>

    )
}
