import { useState } from "react"
import { resetPassword } from "../../api/auth"
import { useNavigate } from "react-router-dom"

export default function ResetPassword() {
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate()

    async function handleResetPassword() {
        if (!code || !email || !newPassword) return
        try {
            await resetPassword({ email, code, newPassword })
            navigate("/auth/login")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div
                className="rounded-3xl shadow-sm w-full max-w-sm px-8 py-12 flex flex-col items-center gap-6"
                style={{ backgroundColor: "var(--card)" }}
            >

                {/* Logo */}
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-xl flex items-center justify-center">
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
                    <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        Reset Password
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        Enter the code sent to your email
                    </p>
                </div>

                {/* Form */}
                <div className="w-full flex flex-col gap-4 mt-2">

                    <div className="flex flex-col gap-1.5">
                        <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="text"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                backgroundColor: "var(--card)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--border)"
                            }}
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
                            Reset Code
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{
                                backgroundColor: "var(--card)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--border)",
                                letterSpacing: "0.2em"
                            }}
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
                            New Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{
                                backgroundColor: "var(--card)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--border)"
                            }}
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        />
                    </div>

                    <button
                        onClick={handleResetPassword}
                        className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-medium text-sm py-3.5 rounded-xl transition-colors mt-1"
                    >
                        Reset Password
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full border-t pt-5 text-center" style={{ borderColor: "var(--border)" }}>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Back to{" "}
                        <button
                            onClick={() => navigate("/auth/login")}
                            style={{ color: "var(--accent)" }}
                            className="font-medium transition-colors"
                        >
                            Login
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}