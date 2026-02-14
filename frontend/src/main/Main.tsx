import { useAuth } from "../context/AuthContext"
export default function Main(){
    const {user} = useAuth()
    return(
        <>
            <div>{user?.email}</div>
        </>
    )
}