const API_URL = "http://localhost:3002/auth"

interface UserCredentials{
    email: string
    password: string
}

export async function createUser(data: UserCredentials){
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if(!res.ok) throw new Error("Failed to register")
    return res.json()
}

export async function loginUser(data: UserCredentials){
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if(!res.ok) throw new Error("Failed to Login")
    return res.json()
}

export async function forgotPassword(email: string){
    const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email})
    })
    if(!res.ok) throw new Error("Failed to Request")
    return res.json()
}

export async function resetPassword(data: {email: string, code: string, newPassword: string}){
    const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if(!res.ok) throw new Error("Failed to Reset Password")
    return res.json()
}
