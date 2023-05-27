
import {useParams} from "react-router-dom"
import { useState, useEffect } from 'react';
import { Post } from "../posts-all/Post";

export const PostDetails = () => {

    const {id} = useParams()
    const [postInfo, setPostInfo] = useState()

    useEffect(() => {
      getPostById()
    }, [])
    

    const getPostById = async () => {
        const queryParams = new URLSearchParams()
        if(id != undefined){
            queryParams.append("post_id", id)
        }

        const url = `https://the-network-ygs6.onrender.com/posts/post?${queryParams.toString()}`

        try {
            const response = await fetch(url)
            if(response.status === 200){
                const post = await response.json()
                console.log(post)
                setPostInfo(post)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="container mb-5 mt-5">
        <div className="post-container row d-flex align-items-center justify-content-center mb-5">
            <Post post = {postInfo}></Post>
        </div>
        
        <br />
        <br />
        <br />

        <form className="form-comment fixed-bottom mb-3" style={{ paddingBottom: '20px' }}>
            <div className="row d-felx align-items-center justify-content-center">
                <div className="col-7">
                    <input
                    className="form-control form-control-lg mx-auto"
                    type="text"
                    placeholder="Comment here"
                    aria-label=".form-control-lg example"
                    />
                </div>
            </div>
        </form>
    </div>
  )
}
