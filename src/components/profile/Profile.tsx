import { useContext } from 'react';
import { AuthContext } from '../../contexts/UserProvider';
import {useState, useEffect} from 'react';
import User from '../../types/user';
import './Profile.css'
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

    const [userInfo, setUserInfo] = useState<User>()
    const user = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
      getUserInfo()
    }, [])
    

    const getUserInfo = async () => {
        const queryParams = new URLSearchParams()
        queryParams.append("userId", user.userId)
        const url = `https://the-network-ygs6.onrender.com/users/user?${queryParams.toString()}`
        try {
            const response = await fetch(url)
            if(response.status === 200){
                const userJson = await response.json()
                setUserInfo(userJson)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const logout = () => {
        user.logout()
        sessionStorage.clear()
        navigate("/login")
    }

  return (
    <div className="container d-flex flex-column align-items-center">
        <div className="card text-center mb-3 mt-5" style={{width: "20rem"}}>
            <div className="card-body">
                <img className='user-picture mb-3' src={userInfo?.picture} alt="" />
                <h5 className="card-title text-primary fs-3">Username: {userInfo?.username}</h5>
                <p className="card-text fs-5">email: {userInfo?.email}</p>
                <p className="card-text fs-5">Posts: {0}</p>
                <div className="row mt-4 mb-4 ms-2 me-2">
                    <button className='btn btn-secondary' onClick={logout}> Logout</button>
                </div>
            </div>
        </div>
    </div>
        
  )
}
