import React, { useState } from 'react'
import axios from 'axios'
export default function DeletePost(props) {
    // const postId = props.postId.id;

    return (
        <div>
            <span className='deletePost' onClick={() => props.deletePostAgreePopUp(true)}>X</span>

        </div>
    )
}
