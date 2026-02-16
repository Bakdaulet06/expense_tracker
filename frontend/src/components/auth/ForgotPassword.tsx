import { useState } from "react"
import { forgotPassword } from "../../api/auth"
import { useNavigate } from "react-router-dom"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    async function handleForgotPassword() {
        if (!email) return
        try {
            const res = await forgotPassword(email)
            console.log(res)
            setEmail("")
            navigate("/auth/reset-password")
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
                    <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Forgot Password?</h1>
                    <p className="text-sm text-gray-400 mt-1">Enter your email to receive a reset code</p>
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

                    <button
                        onClick={handleForgotPassword}
                        className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-medium text-sm py-3.5 rounded-xl transition-colors mt-1"
                    >
                        Send Reset Code
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-100 pt-5 text-center">
                    <p className="text-sm text-gray-400">
                        Remembered it?{" "}
                        <button
                            onClick={() => navigate("/auth/login")}
                            className="text-sky-400 hover:text-sky-500 font-medium transition-colors"
                        >
                            Back to Login
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}