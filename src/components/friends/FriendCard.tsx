import User from "../../types/user"
import defaultPic from "../../assets/react.svg"
import { useState } from "react"
import './FriendCard.css'

export const FriendCard = (props : {user: User, discartFriend: any} ) => {
    const {user, discartFriend} = props
    const [isRemoving,  setIsRemoving] = useState<boolean>(false)

    const handleDiscard = () => {
        setIsRemoving(true)
        setTimeout(()=>{
            discartFriend(user._id)

        },400)
    }
    
  return (
    <>
        <div className={`card w-75 mb-3 ${isRemoving ? 'removing' : ''}`}>
            <div className="card-body">
                <div className="row">
                    <img className="col-2 ms-2 icon-picture-card" src={user.picture || defaultPic} alt="user picture"/>
                    <h5 className="card-title col-6">{user.username}</h5>
                </div>
                <div className="row mt-2">
                    <button className="btn col-6">
                        <i className="bi bi-person-add text-primary fs-2"></i>
                    </button>
                    <button className="btn col-6" onClick={handleDiscard}>
                        <i className="bi bi-person-dash text-secondary fs-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
