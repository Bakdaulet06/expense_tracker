import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import Warning from "../subcomponents/Warning"
export default function ProfilePage(){
    const activeTab = "profile"
    const {logout} = useAuth()
    const [warningStatus, setWarningStatus] = useState<boolean>(false)
    return(
    <div className="flex min-h-screen bg-white md:bg-gray-50">
        <Warning 
            status={warningStatus} 
            message="Are you sure you want to log out?" 
            cancel={() => setWarningStatus(false)}
            action={() => logout()}    
        />
        <Sidebar activeTab={activeTab}/>
        <div className="flex-1 flex flex-col h-screen">
            <div className="flex-1 flex items-end justify-center p-6">
                    <button
                        onClick={() => setWarningStatus(true)}
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