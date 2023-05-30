import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import { AuthContext } from '../../contexts/UserProvider';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userContext = useContext(AuthContext)


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
            userContext.login(login.email, login.password)
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
          <Link to="/register">You have an account? Register here</Link>
        </div>
        <div className='row mt-3'>
          <p>Test user: testuser@test.test</p>
          <p>test user password: test.123</p>
        </div>
      </form>
    </div>
  )
}
