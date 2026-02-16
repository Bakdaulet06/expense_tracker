import IconCalendar from "../../svgs/IconCalendar"
import { useAuth } from "../../context/AuthContext"

export default function MainPageHeader(){
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, ".")
    const {user} = useAuth()
    return(
        <>
            <div className="px-6 md:px-14 pt-10 pb-6 md:pb-8 md:bg-white md:border-b md:border-gray-100 flex items-end justify-between">
                <div>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Date</span>
                    <div className="flex items-center gap-2 md:gap-3 mt-0.5 md:mt-1">
                        <h1 className="text-2xl md:text-4xl font-light text-gray-800">{today}</h1>
                        <button className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            <IconCalendar />
                        </button>
                    </div>
                </div>
                {user && (
                    <p className="hidden md:block text-base text-gray-400 pb-1">
                        Hello, <span className="font-semibold text-gray-600">{user.email?.split("@")[0]}</span>
                    </p>
                )}
            </div>
        </>
    )
}