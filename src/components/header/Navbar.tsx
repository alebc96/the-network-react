import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/UserProvider';
import {useState, useEffect} from 'react';
import User from '../../types/user';

export const Navbar = () => {
    const user = useContext(AuthContext)
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState<User>()

    useEffect(() => {
      const temp = sessionStorage.getItem('user')
      if(temp){
        setUserInfo(JSON.parse(temp))
      }
    }, [user])
    

const logout = () => {
    user.logout()
    sessionStorage.clear()
    navigate("/login")
}
  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.05)"}}>
        <div className="container-fluid">
            <Link to="/posts" className="navbar-brand">theNetwork</Link>
            {user.isAuthenticated &&  <img src={userInfo?.picture} alt="" width={"40px"} height={"40px"}/>}
           
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className=" d-felx justify-content-between collapse navbar-collapse" id="navbarTogglerDemo02">
                { !user.isAuthenticated ? 
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/login" style={{textDecoration: "none"}} className="nav-link active" aria-current="page">Sign in</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" style={{textDecoration: "none"}} className="nav-link active" aria-current="page">Sign up</Link>
                </li>
                </ul> 
                :
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button type='button' className="btn" onClick={logout}>Logout</button>
                    </li>
                    <li className="nav-item">
                      <Link to="/my-posts" style={{textDecoration: "none"}} className="nav-link active" aria-current="page">My posts</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/search-friends" style={{textDecoration: "none"}} className="nav-link active" aria-current="page">Search friends</Link>
                    </li>
                </ul> 
              }
            </div>
        </div>
    </nav>

  )
}
