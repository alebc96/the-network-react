import './PostCreate.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import User from '../../types/user';
import { toast } from 'react-toastify';

export const PostCreate = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [picture, setPicture] = useState("")
  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {
    const temp = sessionStorage.getItem("user")
    if(temp){
      setUserInfo(JSON.parse(temp))
    }
  }, [])
  

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const title = e.target.value
    setTitle(title)
  }

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const text = e.target.value
    setText(text)
  }

  const handleOnChangePicture = async (e: React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files !== null){
      const file = e.target.files[0]
      const base64 = await convertToBase64(file)
      setPicture(base64 as string)
    }
  }

  function convertToBase64(file: any){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload =()=>{
        resolve(reader.result)
      }
      reader.onerror = (error) =>{
        reject(error)
      }
    })
  }

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    if(userInfo){
      queryParams.append('user_id', userInfo?._id)
    }
    const post = {
      "title": title,
      "body": text,
      "picture": picture,
    }

    const url = `https://the-network-ygs6.onrender.com/posts?${queryParams.toString()}`;

    try {
      const response = await fetch(url,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            })
            const res = await response.json()
            if(res){
              notifyPost()
              navigate("/posts")
            }
            console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const notifyPost = () => toast.success("Posted successfuly", {
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
    <div className='container d-flex justify-content-center align-items-center mb-5' style={{height: "80%"}}>
        <form className='form container-sm' onSubmit={handleSubmitPost}>
          <div className="row text-center mt-4">
            <h2>Create a Post</h2>
          </div>
          <div className="row">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" id="title" className="form-control" onChange={handleOnChangeTitle}/>
          </div>
          <div className="row">
            <label htmlFor="text" className="form-label">Text</label>
            <input type="text" id="text" className="form-control" onChange={handleOnChangeText}/>
          </div>
          <div className="row mb-3">
              <label htmlFor="picture" className="form-label"></label>
              <input className="form-control" type="file" id="picture" onChange={handleOnChangePicture}/>
          </div>
          <div className="row d-flex justify-content-center align-items-center">
              <label htmlFor='picture' className='post-image'>
                  <img src={picture || "https://pic.onlinewebfonts.com/svg/img_98811.png"} alt=""/>
              </label>
          </div>
          <div className="row text-center">
            <button type='submit' className='btn btn-primary mb-3'>Post it</button>
            <Link to="/posts">Cancel</Link>
          </div>
        </form>
    </div>
  )
}
