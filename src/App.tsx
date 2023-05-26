import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Register } from './components/register/Register'
import { Login } from './components/login/Login'
import { Navbar } from './components/header/Navbar'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/posts" element={<h2>Posts</h2>}/>
        <Route path="/" element={<>Hola</>}/>
      </Routes>
    </>
  )
}

export default App
