import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {return},
  logout: () => {return},
};

// se crea el contexto de autenticacion
export const AuthContext = createContext<AuthContextType>(initialAuthContext);


// se crea el provider con las funciones que se quiere comartir entre componentes
export const AuthProvider: React.FC<any> = ({ children }) => {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
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
            const res = await response.json()
            sessionStorage.setItem('user', JSON.stringify(res))
            console.log(res)
            setIsAuthenticated(true);
            notify()
        }else{
            error()
        }
    } catch (error) {
        console.log(error)
    }
  };

  const logout = () => {
    sessionStorage.clear()
    navigate('/login')
    setIsAuthenticated(false);
  };

  const notify = () => toast.success("Welcom to theNetwork :D", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const error = () => toast.error("Something is wrong :(", {
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
      <ToastContainer/>
    </AuthContext.Provider>
  );
};
