import './Post.css'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserProvider';
import { toast } from 'react-toastify';

export const Post = ({post, handleDelete}: any) => {

    const user = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [postInfo, setPostInfo] = useState<any>(post)
    const [userInfo, setUserInfo] = useState<any>({})
    const [likes, setLikes] = useState<number>(post?.likes)
    const [dislikes, setDislikes] = useState<number>(post?.dislike)

    useEffect(() => {
      setPostInfo(post)
      getUserInfo()
      console.log(location.pathname)
    }, [postInfo])

    const getUserInfo = async () => {
        const queryParams = new URLSearchParams()
        queryParams.append("userId", post?.user_id)
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
        
    
    const handleComment = () => {
        //console.log(postInfo)
        navigate(`/posts/${post?._id}`)
    }

    const handleLike = async () => {
        if(user.isAuthenticated){
            const queryParams = new URLSearchParams()
            queryParams.append("post_id", postInfo?._id)

            const url = `https://the-network-ygs6.onrender.com/posts/like?${queryParams.toString()}`
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                })
                if(response.status == 200){
                    setLikes(likes + 1)
                }
            } catch (error) {
                console.log(error)
            }

        }else{
            error()
        }
    }

    const handleDislike = async () => {
        if(user.isAuthenticated){
            const queryParams = new URLSearchParams()
            queryParams.append("post_id", postInfo?._id)

            const url = `https://the-network-ygs6.onrender.com/posts/dislike?${queryParams.toString()}`
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                })
                if(response.status == 200){
                    setDislikes(dislikes + 1)
                }
            } catch (error) {
                console.log(error)
            }

        }else{
            error()
        }
    }


    const error = () => toast.info("Login to comment or like a post", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

  return (
    <div className="card">
        <div className="row d-felx align-items-center justify-content-between">
            <div className='row d-felx align-items-center justify-content-between"'>
                <img className='icon-picture ms-4 mb-2 mt-2' src={userInfo?.picture} alt="user picture" />
                <h4 className='col'>{userInfo?.username}</h4>
                <div className="col text-center">
                {
                    user.userId == post?.user_id && user.isAuthenticated && location.pathname == "/my-posts"
                    ?
                    <button className='btn' onClick={() => handleDelete(post?._id)}>
                        <i className="bi bi-trash3"></i>
                    </button>
                    :
                    <></>
                }
                </div>
            </div>
        </div>
        <img src={post?.picture} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{post?.title}</h5>
            <p className="card-text">{post?.body}</p>
            <div className="row">
                <div className="col text-center">
                    <button type='button' className='btn' onClick={handleLike}>
                        <i className="bi bi-hand-thumbs-up"></i>
                        <span>{likes}</span>
                    </button>
                    
                </div>
                <div className="col text-center">
                    <button type='button' className='btn' onClick={handleDislike}>
                        <i className="bi bi-hand-thumbs-down"></i>
                        <span>{dislikes}</span>
                    </button>
                </div>
                <div className="col text-center">
                    <button className='btn' onClick={handleComment}>
                        <i className="bi bi-chat-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

//testuser@test.test
//test.123