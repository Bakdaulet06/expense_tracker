import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useState } from "react"
import Warning from "../subcomponents/Warning"

export default function ProfilePage() {
  const activeTab = "profile"
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [warningStatus, setWarningStatus] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 md:bg-gray-50 md:dark:bg-gray-900">
      <Warning
        status={warningStatus}
        message="Are you sure you want to log out?"
        cancel={() => setWarningStatus(false)}
        action={() => logout()}
      />
      <Sidebar activeTab={activeTab} />
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex-1 flex flex-col items-center justify-end gap-4 p-6">

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="w-full max-w-sm py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold text-sm tracking-wide hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            {theme === "light" ? "🌙 Switch to Dark Mode" : "☀️ Switch to Light Mode"}
          </button>

          <button
            onClick={() => setWarningStatus(true)}
            className="w-full max-w-sm py-3 rounded-xl border-2 border-red-400 text-red-400 font-semibold text-sm tracking-wide hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
          >
            Log Out
          </button>
        </div>
        <div className="md:hidden">
          <BottomTabMobile activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}