import IconCalendar from "../../svgs/IconCalendar"
import { useAuth } from "../../context/AuthContext"
import { useRef} from "react"
import { useDate } from "../../context/DateContext"

export default function MainPageHeader() {

    const { user } = useAuth()
    const {date, setDate} = useDate()

    const inputRef = useRef<HTMLInputElement>(null)

    const formattedDate = date
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")

    function handleCalendarClick() {
        inputRef.current?.showPicker()
    }

    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) return
        setDate(new Date(e.target.value))
    }

    return (
        <div className="px-6 md:px-14 pt-10 pb-6 md:pb-8 md:bg-white md:border-b md:border-gray-100 flex items-end justify-between">
            
            <div>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Date
                </span>

                <div className="flex items-center gap-2 md:gap-3 mt-0.5 md:mt-1">
                    <h1 className="text-2xl md:text-4xl font-light text-gray-800">
                        {formattedDate}
                    </h1>

                    <div className="relative">
                        <button
                            onClick={handleCalendarClick}
                            className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <IconCalendar />
                        </button>

                        <input
                            type="date"
                            ref={inputRef}
                            onChange={handleDateChange}
                            className="absolute right-0 top-full mt-2 opacity-0 pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            {user && (
                <p className="hidden md:block text-base text-gray-400 pb-1">
                    Hello,{" "}
                    <span className="font-semibold text-gray-600">
                        {user.email?.split("@")[0]}
                    </span>
                </p>
            )}
        </div>
    )
}
