import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api/auth"
import { useAuth } from "../context/AuthContext"
export default function Login(){
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const navigate = useNavigate()
    const {setUser} = useAuth()

    async function handleLogin(){
        if(!email || !password) return
        try{
            const res = await loginUser({email, password})
            console.log(res)
            setUser(res)
            navigate("/")
        }catch(err){
            console.error(err)
        }
    }
    return(
        <>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>LOGIN</button>
            <a onClick={() => navigate("/auth/forgot-password")}>Forgot password?</a>
            <p>Need an account? <span onClick={() => navigate("/auth/register")}>SIGN UP</span></p>
        </>
    )
}