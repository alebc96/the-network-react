import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Register } from './components/register/Register'
import { Login } from './components/login/Login'
import { Navbar } from './components/header/Navbar'
import { AuthProvider } from './contexts/UserProvider'
import { PostCreate } from './components/post-create/PostCreate'
import { PostAll } from './components/posts-all/PostAll'
import { PostDetails } from './components/post-details/PostDetails'
import { UserPosts } from './components/comments/user-posts/UserPosts'
import { Friends } from './components/friends/Friends'
import { Profile } from './components/profile/Profile'
import { ProfileUser } from './components/profile/ProfileUser'

function App() {

  return (
    <>
    <AuthProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/profile" element={<Profile></Profile>}/>
        <Route path="/create-posts" element={<PostCreate></PostCreate>}/>
        <Route path="/posts" element={<PostAll></PostAll>}/>
        <Route path="/my-posts" element={<UserPosts></UserPosts>}/>
        <Route path="/search-friends" element={<Friends></Friends>}/>
        <Route path="/posts/:id" element={<PostDetails></PostDetails>}/>
        <Route path="/users/:id" element={<ProfileUser></ProfileUser>}/>
        <Route path="/" element={<PostAll></PostAll>}/>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
