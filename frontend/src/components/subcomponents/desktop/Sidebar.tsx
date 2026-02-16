import { useAuth } from "../../context/AuthContext"
import IconZen from "../../svgs/IconZen"
import BottomTabDesktop from "./BottomTabDesktop"

export default function Sidebar({activeTab}: {activeTab: string}){
    const {user} = useAuth()
    return(
        <>
            <aside className="hidden md:flex w-72 bg-white border-r border-gray-100 flex-col px-7 py-10 shrink-0">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <IconZen />
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-800 leading-none">ZenFinance</p>
                        <p className="text-xs text-gray-400 mt-0.5">Expense Tracker</p>
                    </div>
                </div>

                <BottomTabDesktop activeTab={activeTab} />

                {user && (
                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-sm shrink-0">
                                {(user.email?.[0] ?? "U").toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-semibold text-gray-700 truncate">{user.email}</p>
                                <p className="text-xs text-gray-400">Account</p>
                            </div>
                        </div>
                    </div>
                )}
            </aside>
        </>
    )
}