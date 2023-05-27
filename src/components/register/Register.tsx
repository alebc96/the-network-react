import './Register.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [picture, setPicture] = useState('')

    const handleOnChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const change = e.target.value
        setUsername(change)
    } 

    const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const change = e.target.value
        setEmail(change)
    } 

    const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const change = e.target.value
        setPassword(change)
    } 

    const handleOnChangePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null){
            const file = e.target.files[0]
            const base64 = await convertToBase64(file)
            setPicture(base64 as string)
        }
    }
    
    //Convertir imagen a base64
    function convertToBase64 (file: any){
        return new Promise((resolve, reject)=>{
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload =()=> {
                resolve(reader.result)
            };
            reader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {
            "username": username,
            "email": email,
            "password": password,
            "picture": picture
        }
        try {
            const response = await fetch('https://the-network-ygs6.onrender.com/users',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })
            const res = await response.json()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{height: "80%"}}>
      <form className='form container-sm' onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center align-items-center">
            <label htmlFor='picture' className='custom-file'>
                <img src={picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt=""/>
            </label>
        </div>
        <div className="row">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" id="username" onChange={handleOnChangeUsername} className="form-control"/>
        </div>
        <div className="row">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" onChange={handleOnChangeEmail} className="form-control"/>
        </div>
        <div className="row">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" onChange={handleOnChangePassword} className="form-control"/>
        </div>
        <div className="row mb-3">
            <label htmlFor="picture" className="form-label"></label>
            <input className="form-control" type="file" id="picture" onChange={handleOnChangePicture}/>
        </div>
        <div className="row text-center">
          <button type='submit' className='btn btn-primary mb-3'>Register</button>
          <Link to="/login">You have an account? Login here</Link>
        </div>
      </form>
    </div>
  )
}
