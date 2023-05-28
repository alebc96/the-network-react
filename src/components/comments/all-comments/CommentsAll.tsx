import { CommentCard } from "../comments-card/CommentCard"


export const CommentsAll = ({comments}: any) => {

  return (
    <div className="container ">
        {comments?.map((comment: any) => (
            <CommentCard key={comment._id} comment = {comment}/>
        ))}
    </div>
  )
}
