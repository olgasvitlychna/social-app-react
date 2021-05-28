import React, { useEffect } from 'react';
import './Posts.css'
import axios from 'axios'


function Posts() {

    useEffect(() => {
        const newPost = (event) => {

            event.preventDefault()

            let postData = {
                id: 172,
                user_id: 4,
                content: "Dolorem et laborum aperiam non aut quis quia. Recusandae neque quia ducimus nostrum cupiditate iure nesciunt. Magni et et debitis laboriosam id. Ea laborum quas magnam voluptatem animi et reprehenderit. Ducimus vitae sint totam est. Inventore et id impedit modi. Et impedit nobis perferendis ab. Totam aspernatur sint sapiente.",
                created_at: "2020-07-14T07:13:22.000000Z",
                updated_at: null
            };

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            };

            axios.post(
                'https://akademia108.pl/api/social-app/post/latest',
                postData,
                axiosConfig)
                .then((res) => {
                    console.log(res.data);

                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    })

    return (
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