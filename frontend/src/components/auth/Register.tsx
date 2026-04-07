import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, loginUser } from "../../api/auth"
import { useAuth } from "../context/AuthContext"
import { useCategories } from "../context/CategoriesProvider"
import { getCategories } from "../../api/expense"
import PopUp from "../subcomponents/PopUp"

export default function Register() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const { setCategories } = useCategories()
    const [popUpMessage, setPopUpMessage] = useState("")
    const [popUpStatus, setPopUpStatus] = useState<"inactive" | "success" | "failure">("inactive")

    async function handleRegister() {
        if (!email || !password) {
            setPopUpMessage("Please fill out both email and password!")
            setPopUpStatus("failure")
            return
        }

        try {
            await createUser({ email, password })
            const res = await loginUser({ email, password })
            localStorage.setItem("token", res.token)
            setUser(res)
            setPopUpMessage("User created successfully!")
            setPopUpStatus("success")
            const categories = await getCategories(res.token)
            setCategories(categories)
            navigate("/expense/add-expense")
        } catch (err: any) {
            setPopUpMessage(err.message)
            setPopUpStatus("failure")
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <PopUp status={popUpStatus} message={popUpMessage} onClose={() => setPopUpStatus("inactive")} />

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm w-full max-w-sm px-8 py-12 flex flex-col items-center gap-6">

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
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                        ZenFinance
                    </h1>
                    <p className="text-sm text-gray-400 dark:text-gray-300 mt-1">
                        Create your account
                    </p>
                </div>

                {/* Form */}
                <div className="w-full flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="text"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-gray-700 transition-all bg-white dark:bg-gray-700"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-gray-700 transition-all bg-white dark:bg-gray-700"
                        />
                    </div>

                    <button
                        onClick={handleRegister}
                        className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-medium text-sm py-3.5 rounded-xl transition-colors mt-1"
                    >
                        Create Account
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-100 dark:border-gray-700 pt-5 text-center">
                    <p className="text-sm text-gray-400 dark:text-gray-300">
                        Already a user?{" "}
                        <button
                            onClick={() => navigate("/auth/login")}
                            className="text-sky-400 hover:text-sky-500 font-medium transition-colors"
                        >
                            Login
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}