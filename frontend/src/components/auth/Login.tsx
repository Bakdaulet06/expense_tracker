import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../api/auth"
import { useAuth } from "../context/AuthContext"

export default function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const { setUser } = useAuth()

    async function handleLogin() {
        if (!email || !password) return
        try {
            const res = await loginUser({ email, password })
            setUser(res)
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-sm w-full max-w-sm px-8 py-12 flex flex-col items-center gap-6">

                {/* Logo */}
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <svg
                        className="w-7 h-7 text-sky-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="5" width="20" height="14" rx="3" />
                        <path d="M2 10h20" />
                    </svg>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">ZenFinance</h1>
                    <p className="text-sm text-gray-400 mt-1">Simplicity in every transaction</p>
                </div>

                {/* Form */}
                <div className="w-full flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                        <input
                            type="text"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-medium text-sm py-3.5 rounded-xl transition-colors mt-1"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/auth/forgot-password")}
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-100 pt-5 text-center">
                    <p className="text-sm text-gray-400">
                        New here?{" "}
                        <button
                            onClick={() => navigate("/auth/register")}
                            className="text-sky-400 hover:text-sky-500 font-medium transition-colors"
                        >
                            Create Account
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}