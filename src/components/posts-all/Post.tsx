import './Post.css'

export const Post = ({post}: any) => {

  return (
    <div className="card">
        <img src={post?.picture} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{post?.title}</h5>
            <p className="card-text">{post?.body}</p>
            <div className="row">
                <div className="col text-center">
                    <button className='btn'>
                        <i className="bi bi-hand-thumbs-up"></i>
                    </button>
                    
                </div>
                <div className="col text-center">
                    <button className='btn'>
                        <i className="bi bi-hand-thumbs-down"></i>
                    </button>
                </div>
                <div className="col text-center">
                    <button className='btn'>
                        <i className="bi bi-chat-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
