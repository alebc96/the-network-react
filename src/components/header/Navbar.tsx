import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/UserProvider';

export const Navbar = () => {

    const user = useContext(AuthContext)

    const navigate = useNavigate()

function isAuthenticated() {
    const user = sessionStorage.getItem('user');
    return user !== null;
}

const logout = () => {
    user.logout()
    sessionStorage.clear()
    navigate("/login")
}

console.log(user.isAuthenticated)
  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.05)"}}>
        <div className="container-fluid">
            <Link to="/" className="navbar-brand">theNetwork</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
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
                <button type='button' className="btn" onClick={logout}>Logout</button>
              }
            
            </div>
        </div>
    </nav>

  )
}
