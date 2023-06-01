import { useState, useEffect } from 'react';
import User from '../../types/user';
import { FriendCard } from './FriendCard';
import { Spinner } from '../spinner/Spinner';

export const Friends = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getAllUsers()
    }, [])
    

    const getAllUsers = async () => {
        const url = `https://the-network-ygs6.onrender.com/users`
        const response = await fetch(url)
        if(response.status === 200){
            const allUsers = await response.json()
            setUsers(allUsers)
        }
    }

    const discartFriend = (userId: string) => {
       const userFiltered = users.filter((user: User) => user._id !== userId)
       setUsers(userFiltered)
    }

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
        <h2 className='mt-4 mb-4'>Search new friends</h2>
        {
            users.length !== 0
            ?
            users.map((user: User) => (
                <FriendCard user = {user} key={user._id} discartFriend = {discartFriend}/>
            ))
            :
            <Spinner></Spinner>
        }
    </div>
  )
}
