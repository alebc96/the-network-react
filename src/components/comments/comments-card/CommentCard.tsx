import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../../contexts/UserProvider';
import { toast } from 'react-toastify';
import './CommentCard.css'
//import { useNavigate } from 'react-router-dom';

export const CommentCard = ({comment}: any) => {

    //const navigate = useNavigate()
    const user = useContext(AuthContext)
    const [like, setLike] = useState<number>(comment?.likes || 0)
    const [dislike, setDislike] = useState<number>(comment?.dislikes || 0)
    const [userInfo, setUserInfo] = useState<any>({})

    useEffect(() => {
        getUserInfo()
    }, [])
    

    const handleLike = async () => {
        if(user.isAuthenticated){
            const queryParams = new URLSearchParams()
            queryParams.append("comment_id", comment?._id)
    
            const url = `https://the-network-ygs6.onrender.com/posts/comments/like?${queryParams.toString()}`
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                })
    
                if(response.status == 200){
                    setLike(like+1)
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            error()
        }
    }

    const handleDisike = async () => {
        if(user.isAuthenticated){
            const queryParams = new URLSearchParams()
            queryParams.append("comment_id", comment?._id)
    
            const url = `https://the-network-ygs6.onrender.com/posts/comments/dislike?${queryParams.toString()}`
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                })
    
                if(response.status == 200){
                    setDislike(dislike+1)
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            error()
        }
    }

    const handleDelete = async () => {
        const queryParams = new URLSearchParams()
        queryParams.append("comment_id", comment?._id)
        const url = `https://the-network-ygs6.onrender.com/posts/comments?${queryParams.toString()}`
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
            if(response.status == 200){
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const error = () => toast.info("Login to comment or like a post or comment", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const getUserInfo = async () => {
        const queryParams = new URLSearchParams()
        queryParams.append("userId", comment?.user_id)
        const url = `https://the-network-ygs6.onrender.com/users/user?${queryParams.toString()}`
        try {
            const response = await fetch(url)
            if(response.status == 200){
                const userFinded = await response.json()
                if(userFinded){
                    setUserInfo(userFinded)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className="post-container row d-flex align-items-center justify-content-center mb-2">
        <div className="card bg-primary-subtle">
        <div className="row d-felx align-items-center">
            <img className='icon-picture-card col-6 ms-4 mb-2 mt-2' src={userInfo?.picture} alt="user picture" />
            <h5 className='col-6'>{userInfo?.username}</h5>
        </div>
            <div className="card-body">
                {comment?.body}
            </div>
            <div className="row">
                <div className="col text-center">
                    <button className='btn' onClick={handleLike}>
                        <i className="bi bi-hand-thumbs-up"></i>
                        <span>{like}</span>
                    </button>
                    
                </div>
                <div className="col text-center">
                    <button className='btn' onClick={handleDisike}>
                        <i className="bi bi-hand-thumbs-down"></i>
                        <span>{dislike}</span>
                    </button>
                </div>
                {
                    user.userId == comment?.user_id
                    ?
                    <div className="col text-center">
                        <button className='btn' onClick={handleDelete}>
                            <i className="bi bi-trash3"></i>
                        </button>
                    </div>
                    :
                    ""
                }
            </div>
        </div>
    </div>
  )
}
