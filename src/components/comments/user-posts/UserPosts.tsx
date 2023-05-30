import { useState, useEffect } from "react"
import { Post } from "../../posts-all/Post"
import { useNavigate } from "react-router-dom"

export const UserPosts = () => {

  const [userPosts, setUserPosts] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getUserPosts()
  }, [])
  

  const getUserPosts = async () => {

    const user = sessionStorage.getItem("user")
    const queryParams = new URLSearchParams()
    let userJson 
    if(user){
      userJson = JSON.parse(user)
      queryParams.append("user_id", userJson?._id)
      const url = `https://the-network-ygs6.onrender.com/users/posts?${queryParams.toString()}`
      try {
        const response = await fetch(url)
        if(response.status == 200){
          const posts = await response.json()
          console.log(posts)
          setUserPosts(posts)
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      return
    }        
  }

  const handleDelete = async (post_id: string) => {
    const queryParams = new URLSearchParams()
    queryParams.append("post_id", post_id)
    const url = `https://the-network-ygs6.onrender.com/posts/post?${queryParams.toString()}`

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        if(response.status == 200){
          setUserPosts(userPosts.filter((user_post: any) => user_post?._id !== post_id));
          console.log(response)
        }
    } catch (error) {
        console.log(error)
    }
}

const handleBack = () => {
  navigate("/posts")
}
  
  return (
    <>
     <button type="button" className="btn ms-5 mt-5" onClick={handleBack}><i className="bi bi-arrow-left-circle"></i></button>
    <div className="container d-flex flex-column align-items-center gap-3">
      
      {
        userPosts.length !== 0
        ?
        userPosts.map(((post: any) =>(
          <Post key={post?._id} post = {post} handleDelete = {handleDelete}></Post>
        ) ))
        : 
        <><h1>Not posts</h1></>
      }
    </div>
    </>
  )
}
