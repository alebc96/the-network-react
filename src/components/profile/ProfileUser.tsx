import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import User from "../../types/user"
import { AuthContext } from "../../contexts/UserProvider"

export const ProfileUser = () => {

  const {id} = useParams()
  const user = useContext(AuthContext)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {
    getUserById()
  }, [])
  

  // hacer el fetch del usuario `por el id de los params y mostrar en una tarjeta la infoç


  const getUserById = async () => {
    if(user.userId == id){
      navigate("/profile")
      return
    }
    const queryParams = new URLSearchParams()
    queryParams.append("userId", id as string)
    const url = `https://the-network-ygs6.onrender.com/users/user?${queryParams.toString()}`
    try {
      const response = await fetch(url)
      if(response.status === 200){
        const userJson = await response.json()
        setUserInfo(userJson)
        console.log(userInfo)
      }
    } catch (error) {
        console.log(error)
    }
  }

  const addFriend = () => {
    alert("add to friend")
  }

  const handleBack = () => {
    navigate("/posts")
  }

  return (
    <>
      <button type="button" className="btn ms-5 mt-3" onClick={handleBack}><i className="bi bi-arrow-left-circle"></i></button>
    <div className="container d-flex flex-column align-items-center">
        <div className="card text-center mb-3 mt-5" style={{width: "20rem"}}>
            <div className="card-body">
                <img className='user-picture mb-3' src={userInfo?.picture} alt="" />
                <h5 className="card-title text-primary fs-3">Username: {userInfo?.username}</h5>
                <p className="card-text fs-5">email: {userInfo?.email}</p>
                <p className="card-text fs-5">Posts: {0}</p>
                <div className="row mt-4 mb-4 ms-2 me-2">
                    <button className='btn btn-primary' onClick={addFriend}>Send request</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
