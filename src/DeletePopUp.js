import React, { useState } from 'react'
import axios from 'axios'

export default function DeletePopUp(props) {
     const [deletePostAgree, setDeletePostAgree] = useState(false)
     console.log(props)
    // const postId = props.postId.id;
    const user = JSON.parse(localStorage.getItem('user'));
   
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
                    post_id: 40
                },
                axiosConfig)
                .then((res) => {
                    // setUserPost(res.data.post.content)
                    // setPostsList(newPosts.unshift(res.data.post.content));
                    // console.log(res.data)
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    return (
        <div>
            <div className='agree-container'>
                <p>Are you sure?</p>
                <button className='yes' onClick={deletePost}>Yes</button>
                <button className='cancel'>Cancel</button>
            </div>
        </div>
    )
}
