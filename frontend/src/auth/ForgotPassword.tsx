import { useState } from "react"
import { forgotPassword } from "../api/auth"
import { Navigate, useNavigate } from "react-router-dom"
export default function ForgotPassword(){
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    async function handleForgotPassword(){
        if(!email){
            return
        }
        try{
            console.log(email)
            const res = await forgotPassword(email)
            console.log(res)
            setEmail("")
            navigate("/auth/reset-password")
        }catch(err){
            console.error(err)
        }
    }
    return(
        <>
            <div>Forgot Password</div>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={() => handleForgotPassword()}>Send</button>
        </>
    )
}