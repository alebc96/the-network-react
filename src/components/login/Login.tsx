import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const change = e.target.value
        setEmail(change)
    } 

    const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const change = e.target.value
        setPassword(change)
    } 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const login = {
            "email": email,
            "password": password,
        }
        try {
            const response = await fetch('https://the-network-ygs6.onrender.com/users/login',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(login)
            })
            if(response.status == 200){
                navigate("/posts")
            }
            const res = await response.json()
            sessionStorage.setItem('user', JSON.stringify(res))
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{height: "80vh"}}>
      <form className='form container-sm' onSubmit={handleSubmit}>
        <div className="container d-flex justify-content-center align-items-center">
            <h2>Log in</h2>
        </div>
        <div className="row mb-2">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" onChange={handleOnChangeEmail} className="form-control"/>
        </div>
        <div className="row mb-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" onChange={handleOnChangePassword} className="form-control mb-4"/>
        </div>
        <div className="row text-center">
          <button type='submit' className='btn btn-primary mb-3'>Sing in</button>
          <Link to="/register">You have an account? Login here</Link>
        </div>
      </form>
    </div>
  )
}
