import './Post.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Post = ({post}: any) => {
    const navigate = useNavigate()
    const [postInfo, setPostInfo] = useState()

    useEffect(() => {
      setPostInfo(post)
    }, [post])
    
    
    const handleComment = () => {
        console.log(postInfo)
        navigate(`/posts/${post?._id}`)
    }

  return (
    <div className="card">
        <img src={post?.picture} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{post?.title}</h5>
            <p className="card-text">{post?.body}</p>
            <div className="row">
                <div className="col text-center">
                    <button className='btn'>
                        <i className="bi bi-hand-thumbs-up"></i>
                        <span>{post?.likes}</span>
                    </button>
                    
                </div>
                <div className="col text-center">
                    <button className='btn'>
                        <i className="bi bi-hand-thumbs-down"></i>
                        <span>{post?.dislike}</span>
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
