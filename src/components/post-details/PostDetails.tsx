
import {useParams, useNavigate} from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import { Post } from "../posts-all/Post";
import { AuthContext } from "../../contexts/UserProvider";
import { CommentsAll } from "../comments/all-comments/CommentsAll";
import { Spinner } from "../spinner/Spinner";

export const PostDetails = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const [comment, setComment] = useState("")
    const [postInfo, setPostInfo] = useState<any>()
    const [commets, setCommets] = useState<any[]>([])
    const user = useContext(AuthContext)

    useEffect(() => {
      getPostById()
    }, [])

    useEffect( () => {
        getAllCommets()
    }, [commets])
    

    const getAllCommets = async () => {
        const queryParams = new URLSearchParams()
        if(id){
            queryParams.append("post_id", id)
        }

        const url = `https://the-network-ygs6.onrender.com/posts/comments?${queryParams.toString()}`
        //console.log(url)
        try {
            const comments_res = await fetch(url)
            if(comments_res.status == 200){
                const comments_json = await comments_res.json()
                //console.log(comments_json)
                setCommets(comments_json)
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                //console.log(post)
                setPostInfo(post)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const comment = e.target.value
        setComment(comment)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //console.log(user.userId)
        const queryParams = new URLSearchParams()
        if(postInfo && user.isAuthenticated){
            queryParams.append("post_id", postInfo?._id)
            queryParams.append("user_id", user.userId)
        }

        const url = `https://the-network-ygs6.onrender.com/posts/comments?${queryParams.toString()}`
        
        const text = {
            "body": comment
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(text)
            })

            if(response.status === 201){
                const comm = await response.json();
                if(comm){
                    setCommets([...commets, comm])
                }
                setComment("")
                //console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBack = () => {
        navigate("/posts")
    }

  return (
    <div className="container mb-5 mt-5">
        <button type="button" className="btn" onClick={handleBack}><i className="bi bi-arrow-left-circle"></i></button>
        {
            postInfo !== undefined
            ?
            <div className="post-container row d-flex align-items-center justify-content-center mb-5">
                <Post post = {postInfo}></Post>
            </div>
            :
            <Spinner></Spinner>
        }
        
        <br />

        <CommentsAll comments = {commets}/>

        <br />
        <br />

        {user.isAuthenticated 
        
        ? 
        
        <form className="form-comment fixed-bottom mb-3" onSubmit={handleSubmit} style={{ paddingBottom: '20px' }}>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-9">
                <div className="input-group">
                    <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Comment here"
                    aria-label=".form-control-lg example"
                    value={comment}
                    onChange={handleOnChangeComment}
                    />
                    <button type="submit" className="btn btn-primary ms-2">
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
                </div>
            </div>
        </form>
        : 
        <></>
        }
    </div>
  )
}
