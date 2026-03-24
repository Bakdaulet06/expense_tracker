import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import StatsPageHeader from "../subcomponents/headers/StatsPageHeader"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../context/AuthContext"
import { getStats } from "../../api/expense"
import type {Stats} from "../types/Stats"
import StatsRow from "../subcomponents/CategoryRow"
import IconCalendar from "../svgs/IconCalendar"

export default function StatsPage() {
    const activeTab = "stats"
    const {user} = useAuth()
    const [startDate, setStartDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    const [endDate, setEndDate] = useState<Date>(new Date)
    const [stats, setStats] = useState<Stats[]>([])
    const [totalSpending, setTotalSpending] = useState(0)
    const maxAmount = Math.max(...stats.map((c) => c.amount))

    const formattedStartDate = startDate
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")
    const formattedEndDate = endDate
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")

    useEffect(() => {
        async function fetchFiltered() {
            if (!user) return
            try {
                const res = await getStats(user.token, startDate, endDate)
                const currStats = res.filter(stat => stat.transactions !== 0)
                setStats(currStats)
                setTotalSpending(res.reduce((s, c) => s + c.amount, 0))
                console.log("Stats response:", res)
            } catch (err) {
                console.error(err)
            }}
        fetchFiltered()
    }, [startDate, endDate, user])

    function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) return
        setStartDate(new Date(e.target.value))
    }

    function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) return
        setEndDate(new Date(e.target.value))
    }
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeTab={activeTab}/>
            <div className="flex-1 flex flex-col min-h-screen">
                <StatsPageHeader />
                <div className="flex gap-3 px-6 md:px-14 md:pt-5 pb-5 md:pb-0">
                    <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                        <div className="flex gap-5">
                            <div className="flex flex-col">
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">StartDate</label>
                                <DateHandler formattedDate={formattedStartDate} handlerFunction={handleStartDateChange}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">EndDate</label>
                                <DateHandler formattedDate={formattedEndDate} handlerFunction={handleEndDateChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-5 md:px-14 pb-6 md:py-10">
                    <div className="md:max-w-4xl space-y-6 md:space-y-8">
                        <div className="bg-gray-900 rounded-3xl px-6 md:px-10 py-6 md:py-8 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">
                                    Total Spending
                                </p>
                                <div className="flex items-baseline gap-0.5 md:gap-1">
                                    <span className="text-4xl md:text-6xl font-bold text-white">
                                        {Math.floor(totalSpending).toLocaleString()}.{String((totalSpending % 1).toFixed(2)).slice(2)}₸
                                    </span>
                                </div>
                            </div>
                            <div className="hidden md:flex items-end gap-2 h-16 pr-2">
                                {stats.map((cat) => (
                                    <div
                                        key={cat.name}
                                        className="w-4 rounded-t-md"
                                        style={{
                                            height: `${(cat.amount / maxAmount) * 100}%`,
                                            backgroundColor: cat.color,
                                            opacity: 0.8,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 px-1 md:px-0">
                                By Category
                            </p>
                            {
                                stats.length !== 0 ? 
                                <div className="bg-white rounded-3xl overflow-hidden divide-y divide-gray-50 shadow-sm">
                                    {stats.filter(stat => stat.transactions !== 0).map((stat) => (
                                        <div key={stat.name} className="px-4 md:px-6">
                                            <StatsRow stats={stat} />
                                        </div>
                                    ))}
                                </div> 
                                : 
                                <div>No Transactions</div>
                            }
                        </div>
                    </div>
                    <div className="h-6 md:hidden" />
                </div>
                <div className="md:hidden">
                    <BottomTabMobile activeTab={activeTab} />
                </div>
            </div>
        </div>
    )
}

function DateHandler(props: {formattedDate: string, handlerFunction: (e: React.ChangeEvent<HTMLInputElement>) => void}){
    const inputRef = useRef<HTMLInputElement>(null)
    return(
        <div className="flex items-center gap-2 md:gap-3 mt-0.5 md:mt-1">
            <h1 className="text-xl md:text-4xl font-light text-gray-800">
                {props.formattedDate}
            </h1>
            <div className="relative">
                <button
                    onClick={() => inputRef.current?.showPicker()}
                    className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                    <IconCalendar />
                </button>
                <input
                    type="date"
                    ref={inputRef}
                    onChange={props.handlerFunction}
                    className="absolute right-0 top-full mt-2 opacity-0 pointer-events-none"
                />
            </div>
        </div>
    )
}