import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, loginUser } from "../api/auth"

export default function Register(){
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const navigate = useNavigate()

    async function handleRegister() {
        if (!email || !password) return;

        try {
            await createUser({ email, password });
            await loginUser({email, password})
            navigate("/");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Registration failed");
        }
    }
    return(
        <>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleRegister}>SIGN UP</button>
            <p>Already a user? <span onClick={() => navigate("/login")}>LOGIN</span></p>
        </>
    )
}