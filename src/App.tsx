import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Register } from './components/register/Register'
import { Login } from './components/login/Login'
import { Navbar } from './components/header/Navbar'
import { AuthProvider } from './contexts/UserProvider'
import { PostCreate } from './components/post-create/PostCreate'
import { PostAll } from './components/posts-all/PostAll'

function App() {

  return (
    <>
    <AuthProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/create-posts" element={<PostCreate></PostCreate>}/>
        <Route path="/posts" element={<PostAll></PostAll>}/>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
