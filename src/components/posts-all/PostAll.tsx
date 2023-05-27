import { useContext, useEffect, useState } from 'react';
import { Post } from './Post';
import './PostAll.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserProvider';

export const PostAll = () => {

    const user = useContext(AuthContext)
    const [allPosts, setAllPosts] = useState<any>([])

    useEffect(() => {
        getAllPost()
    }, [])


    const getAllPost = async () => {
        try {
            const posts = await fetch("https://the-network-ygs6.onrender.com/posts")
            const data = await posts.json()
            setAllPosts(data)
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className="container text-center">
        <div className="row text-center">
            {user?.isAuthenticated 
            ? 
            <Link to={"/create-posts"} className='btn btn-primary btn-create'>
                Create post <i className="bi bi-pencil"></i>
            </Link>
            : 
            <Link to={"/login"} className='btn btn-primary btn-create'>
                Login to post <i className="bi bi-pencil"></i>
            </Link>
            }
            
        </div>
        <div className="container-cards">
            
            {allPosts.map((post: any) => (<Post key={post?._id} post = {post}></Post>))}
        </div>
    </div>
  )
}
