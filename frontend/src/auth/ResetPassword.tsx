import { useState } from "react"
import { resetPassword } from "../api/auth"
import { useNavigate } from "react-router-dom"

export default function ResetPassword(){
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate()
    async function handleResetPassword(){
        if(!code || !email || !newPassword){
            return
        }
        try{
            await resetPassword({email, code, newPassword})
            console.log("Password reset successfully")
            navigate("/auth/login")
        }catch(err){
            console.error(err)
        }
    }
    return( 
        <>
            <div>Reset Password</div>
            <input type="text" placeholder="Write the code" onChange={(e) => setCode(e.target.value)} value={code}/>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input type="text" placeholder="new password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
            <button onClick={handleResetPassword}>Send</button>
        </>
    )
}