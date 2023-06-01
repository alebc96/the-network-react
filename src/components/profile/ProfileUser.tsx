import { useParams } from "react-router-dom"

export const ProfileUser = () => {

  const {id} = useParams()

  // hacer el fetch del usuario `por el id de los params y mostrar en una tarjeta la info

  return (
    <>
      <div>{id}</div>
      <img src="" alt="" />
    </>
  )
}
