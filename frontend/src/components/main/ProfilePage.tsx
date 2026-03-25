import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import { useAuth } from "../context/AuthContext"
export default function ProfilePage(){
    const activeTab = "profile"
    const {logout} = useAuth()
    return(
    <div className="flex min-h-screen bg-white md:bg-gray-50">
        <Sidebar activeTab={activeTab}/>
        <div className="flex-1 flex flex-col h-screen">
            <div className="flex-1 flex items-end justify-center p-6">
                    <button
                        onClick={() => logout()}
                        className="w-full max-w-sm py-3 rounded-xl border-2 border-red-400 text-red-400 font-semibold text-sm tracking-wide hover:bg-red-50 transition-colors"
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